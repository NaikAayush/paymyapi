// SPDX-License-Identifier: MIT

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

contract PayMyAPI {
    // TODO: events

    struct Plan {
        uint256 pricePerSecond;
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

    mapping(address => Plan[]) apis;

    constructor() {}

    function addPlan(
        uint256 pricePerSecond,
        uint256 perMonthLimit,
        uint256 perSecondLimit
    ) public returns (uint256 planIndex) {
        address developer = msg.sender;
        apis[developer].push(
            Plan(pricePerSecond, perMonthLimit, perSecondLimit, true)
        );
        return apis[developer].length;
    }

    function deactivatePlan(uint256 index) public {
        require(index < apis[msg.sender].length, "Invalid index");
        apis[msg.sender][index].active = false;
    }

    function getPlans(address developer) public view returns (Plan[] memory) {
        return apis[developer];
    }

    function subscribe(address developer, uint256 planId) public {
        require(planId < apis[developer].length, "Invalid plan ID");

        Plan memory plan = apis[developer][planId];

        require(plan.active, "Trying to subscribe to a deactivated plan");

        subscriptions[msg.sender][developer] = Status(
            plan.perMonthLimit,
            planId,
            true
        );
        maybeSubscribedUsers[developer].push(msg.sender);
    }

    function unsubscribe(address developer) public {
        subscriptions[msg.sender][developer].active = false;
    }
}
