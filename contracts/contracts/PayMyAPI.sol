// SPDX-License-Identifier: MIT

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.0;
pragma abicoder v2;

import "@openzeppelin/contracts/cryptography/ECDSA.sol";

import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import {ISuperfluid, ISuperfluidToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import "@chainlink/contracts/src/v0.7/KeeperCompatible.sol";
import "@chainlink/contracts/src/v0.7/ChainlinkClient.sol";

contract PayMyAPI is ChainlinkClient, KeeperCompatibleInterface {
    event ApiAdded(address developer, string message, string url);
    event PlanAdded(
        address developer,
        int96 pricePerSecond,
        uint256 perMonthLimit,
        uint256 perSecondLimit
    );
    event PlanDeactivated(address developer, uint256 planIndex);
    event Subscribed(address developer, address user, uint256 planIndex);
    event Unsubscribed(address developer, address user);
    event AteFromQuota(address developer, address user, uint256 count);

    struct Api {
        bool available;
        string message;
        string url;
        Plan[] plans;
    }

    struct Plan {
        int96 pricePerSecond;
        uint256 perMonthLimit;
        uint256 perSecondLimit;
        bool active;
    }

    struct Status {
        // remaining monthly quota
        uint256 remainingQuota;
        uint256 planId;
        bool active;
    }

    // user address -> (developer address -> subscription status)
    mapping(address => mapping(address => Status)) subscriptions;

    // developer address -> (list of user addresses)
    // IMP: always check if the user is actually subscribed.
    //      This list is not updated when unsubscribed.
    mapping(address => address[]) maybeSubscribedUsers;

    // developer address -> API details
    mapping(address => Api) apis;
    // list of all developers
    address[] developers;

    // Superfluid
    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaV1;
    ISuperfluidToken private token;

    // chainlink
    uint256 public immutable interval;
    uint256 public lastTimeStamp;
    bytes32 public chainlinkJobId;
    uint256 public chainlinkFee;

    constructor(
        ISuperfluid host,
        ISuperfluidToken token_,
        address link,
        address oracle,
        uint256 updateInterval,
        string memory chainlinkJobId_,
        uint256 chainlinkFee_
    ) {
        //initialize InitData struct, and set equal to cfaV1
        cfaV1 = CFAv1Library.InitData(
            host,
            IConstantFlowAgreementV1(
                address(
                    host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
                        )
                    )
                )
            )
        );

        token = token_;

        // chainlink
        setChainlinkToken(link);
        setChainlinkOracle(oracle);
        interval = updateInterval;
        lastTimeStamp = block.timestamp;

        chainlinkJobId = stringToBytes32(chainlinkJobId_);
        chainlinkFee = chainlinkFee_;
    }

    function addApi(string calldata message, string calldata url) public {
        address developer = msg.sender;

        Api storage api = apis[developer];
        api.available = true;
        api.message = message;
        api.url = url;

        developers.push(developer);

        emit ApiAdded(developer, message, url);
    }

    function addPlan(
        int96 pricePerSecond,
        uint256 perMonthLimit,
        uint256 perSecondLimit
    ) public returns (uint256 planIndex) {
        address developer = msg.sender;

        require(apis[developer].available, "API not setup yet");

        apis[developer].plans.push(
            Plan(pricePerSecond, perMonthLimit, perSecondLimit, true)
        );

        emit PlanAdded(
            developer,
            pricePerSecond,
            perMonthLimit,
            perSecondLimit
        );

        return apis[developer].plans.length;
    }

    function deactivatePlan(uint256 index) public {
        require(index < apis[msg.sender].plans.length, "Invalid index");
        apis[msg.sender].plans[index].active = false;

        emit PlanDeactivated(msg.sender, index);
    }

    function getPlans(address developer) public view returns (Plan[] memory) {
        return apis[developer].plans;
    }

    function subscribe(address developer, uint256 planId) public {
        require(planId < apis[developer].plans.length, "Invalid plan ID");

        Plan memory plan = apis[developer].plans[planId];

        require(plan.active, "Trying to subscribe to a deactivated plan");

        subscriptions[msg.sender][developer] = Status(
            plan.perMonthLimit,
            planId,
            true
        );
        maybeSubscribedUsers[developer].push(msg.sender);

        cfaV1.createFlow(developer, token, plan.pricePerSecond);

        emit Subscribed(developer, msg.sender, planId);
    }

    function unsubscribe(address developer) public {
        subscriptions[msg.sender][developer].active = false;

        cfaV1.deleteFlow(msg.sender, developer, token);

        emit Unsubscribed(developer, msg.sender);
    }

    function eatFromQuota(address user, uint256 count) public {
        require(
            subscriptions[user][msg.sender].remainingQuota >= count,
            "Not enough remaining quota!"
        );

        subscriptions[user][msg.sender].remainingQuota -= count;
        AteFromQuota(msg.sender, user, count);
    }

    using ECDSA for bytes32;

    function verifyMessage(
        string memory message,
        address _address,
        bytes memory signature
    ) public pure returns (address, bool) {
        bytes32 messagehash = keccak256(bytes(message));

        address signeraddress = messagehash.toEthSignedMessageHash().recover(
            signature
        );

        if (_address == signeraddress) {
            return (signeraddress, true);
        } else {
            return (signeraddress, false);
        }
    }

    using Chainlink for Chainlink.Request;

    event RequestFulfilled(
        bytes32 indexed requestId,
        address developer,
        address user,
        uint256 count
    );

    function fulfillRequest(
        bytes32 requestId,
        address developer,
        address user,
        uint256 count
    ) public recordChainlinkFulfillment(requestId) {
        emit RequestFulfilled(requestId, developer, user, count);

        require(
            subscriptions[user][developer].remainingQuota >= count,
            "Not enough remaining quota!"
        );

        subscriptions[user][developer].remainingQuota -= count;
        AteFromQuota(developer, user, count);
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        performData = "0x";
    }

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        lastTimeStamp = block.timestamp;

        uint256 numDevs = developers.length;
        for (uint256 i = 0; i < numDevs; i += 1) {
            address developer = developers[i];
            uint256 numUsers = maybeSubscribedUsers[developer].length;
            for (uint256 j = 0; j < numUsers; j += 1) {
                address user = maybeSubscribedUsers[developer][j];

                if (subscriptions[user][developer].active) {
                    requestUpdate(developer, user);
                }
            }
        }
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    function requestUpdate(address developer, address user)
        public
        returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(
            chainlinkJobId,
            address(this),
            this.fulfillRequest.selector
        );

        request.add(
            "get",
            string(
                abi.encodePacked(
                    apis[developer].url,
                    "/paymyapi/usage/",
                    toAsciiString(user)
                )
            )
        );

        return sendChainlinkRequest(request, chainlinkFee);
    }

    function stringToBytes32(string memory source)
        private
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }
}
