import { BigInt } from "@graphprotocol/graph-ts";
import {
  PayMyAPI,
  ApiAdded,
  AteFromQuota,
  PlanAdded,
  PlanDeactivated,
  Subscribed,
  Unsubscribed,
} from "../generated/PayMyAPI/PayMyAPI";
import {
  ApiRecord,
  PlanRecord,
  StatusRecord,
  Subscriptions,
  UserSubscription,
} from "../generated/schema";

export function handleApiAdded(event: ApiAdded): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let apiRecord = new ApiRecord(event.params.developer.toHexString());
  apiRecord.message = event.params.message;
  apiRecord.available = true;
  apiRecord.url = event.params.url;
  apiRecord.owner = event.params.developer.toHexString();
  apiRecord.save();
}

export function handleAteFromQuota(event: AteFromQuota): void {}

export function handlePlanAdded(event: PlanAdded): void {
  let planRecord = new PlanRecord(event.params.developer.toHexString());
  planRecord.owner = event.params.developer.toHexString();
  planRecord.pricePerSecond = event.params.pricePerSecond;
  planRecord.perMonthLimit = event.params.perMonthLimit;
  planRecord.perSecondLimit = event.params.perSecondLimit;
  planRecord.active = true;
  planRecord.save();
}

export function handlePlanDeactivated(event: PlanDeactivated): void {
  let owner = event.params.developer.toHexString();
  let planRecord = PlanRecord.load(owner);
  if (planRecord == null) {
    return;
  }
  planRecord.active = false;
  planRecord.save();
}

export function handleSubscribed(event: Subscribed): void {
  let userSubscription = new UserSubscription(
    event.params.developer.toHexString()
  );
  userSubscription.user = event.params.user.toHexString();
  userSubscription.planIndex = event.params.planIndex;

  let statusRecord = new StatusRecord(event.params.developer.toHexString());
  statusRecord.owner = event.params.developer.toHexString();
  statusRecord.user = event.params.user.toHexString();

  let owner = event.params.developer.toHexString();
  let apiRecord = ApiRecord.load(owner);
  let planRecord: PlanRecord = (apiRecord?.plans[
    event.params.planIndex.toI64()
  ] as unknown) as PlanRecord;

  statusRecord.remainingQuota = planRecord.perMonthLimit;
  statusRecord.planId = event.params.planIndex;
  statusRecord.active = true;
  userSubscription.status = (statusRecord as unknown) as string;

  let subscriptions = new Subscriptions(event.params.developer.toHexString());
  subscriptions.owner = event.params.developer.toHexString();
  subscriptions.subscribers.push((userSubscription as unknown) as string);

  userSubscription.save();
  statusRecord.save();
  subscriptions.save();
}

export function handleUnsubscribed(event: Unsubscribed): void {}
