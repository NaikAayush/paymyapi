// SPDX-License-Identifier: MIT

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.0;
pragma abicoder v2;

import "@openzeppelin/contracts/cryptography/ECDSA.sol";

import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import {ISuperfluid, ISuperfluidToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

contract PayMyAPI {
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

    mapping(address => Api) apis;

    // Superfluid
    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaV1;
    ISuperfluidToken private token;

    constructor(ISuperfluid host, ISuperfluidToken token_) {
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
    }

    function addApi(string calldata message, string calldata url) public {
        address developer = msg.sender;

        Api storage api = apis[developer];
        api.available = true;
        api.message = message;
        api.url = url;

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
}
