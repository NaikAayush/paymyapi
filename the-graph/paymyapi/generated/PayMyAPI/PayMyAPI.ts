// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ApiAdded extends ethereum.Event {
  get params(): ApiAdded__Params {
    return new ApiAdded__Params(this);
  }
}

export class ApiAdded__Params {
  _event: ApiAdded;

  constructor(event: ApiAdded) {
    this._event = event;
  }

  get developer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get message(): string {
    return this._event.parameters[1].value.toString();
  }

  get url(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class AteFromQuota extends ethereum.Event {
  get params(): AteFromQuota__Params {
    return new AteFromQuota__Params(this);
  }
}

export class AteFromQuota__Params {
  _event: AteFromQuota;

  constructor(event: AteFromQuota) {
    this._event = event;
  }

  get developer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get count(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ChainlinkCancelled extends ethereum.Event {
  get params(): ChainlinkCancelled__Params {
    return new ChainlinkCancelled__Params(this);
  }
}

export class ChainlinkCancelled__Params {
  _event: ChainlinkCancelled;

  constructor(event: ChainlinkCancelled) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class ChainlinkFulfilled extends ethereum.Event {
  get params(): ChainlinkFulfilled__Params {
    return new ChainlinkFulfilled__Params(this);
  }
}

export class ChainlinkFulfilled__Params {
  _event: ChainlinkFulfilled;

  constructor(event: ChainlinkFulfilled) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class ChainlinkRequested extends ethereum.Event {
  get params(): ChainlinkRequested__Params {
    return new ChainlinkRequested__Params(this);
  }
}

export class ChainlinkRequested__Params {
  _event: ChainlinkRequested;

  constructor(event: ChainlinkRequested) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class PlanAdded extends ethereum.Event {
  get params(): PlanAdded__Params {
    return new PlanAdded__Params(this);
  }
}

export class PlanAdded__Params {
  _event: PlanAdded;

  constructor(event: PlanAdded) {
    this._event = event;
  }

  get developer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pricePerSecond(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get perMonthLimit(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get perSecondLimit(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class PlanDeactivated extends ethereum.Event {
  get params(): PlanDeactivated__Params {
    return new PlanDeactivated__Params(this);
  }
}

export class PlanDeactivated__Params {
  _event: PlanDeactivated;

  constructor(event: PlanDeactivated) {
    this._event = event;
  }

  get developer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get planIndex(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class RequestFulfilled extends ethereum.Event {
  get params(): RequestFulfilled__Params {
    return new RequestFulfilled__Params(this);
  }
}

export class RequestFulfilled__Params {
  _event: RequestFulfilled;

  constructor(event: RequestFulfilled) {
    this._event = event;
  }

  get requestId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get developer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get user(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get count(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Subscribed extends ethereum.Event {
  get params(): Subscribed__Params {
    return new Subscribed__Params(this);
  }
}

export class Subscribed__Params {
  _event: Subscribed;

  constructor(event: Subscribed) {
    this._event = event;
  }

  get developer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get planIndex(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Unsubscribed extends ethereum.Event {
  get params(): Unsubscribed__Params {
    return new Unsubscribed__Params(this);
  }
}

export class Unsubscribed__Params {
  _event: Unsubscribed;

  constructor(event: Unsubscribed) {
    this._event = event;
  }

  get developer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PayMyAPI__cfaV1Result {
  value0: Address;
  value1: Address;

  constructor(value0: Address, value1: Address) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    return map;
  }
}

export class PayMyAPI__checkUpkeepResult {
  value0: boolean;
  value1: Bytes;

  constructor(value0: boolean, value1: Bytes) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromBytes(this.value1));
    return map;
  }
}

export class PayMyAPI__getPlansResultValue0Struct extends ethereum.Tuple {
  get pricePerSecond(): BigInt {
    return this[0].toBigInt();
  }

  get perMonthLimit(): BigInt {
    return this[1].toBigInt();
  }

  get perSecondLimit(): BigInt {
    return this[2].toBigInt();
  }

  get active(): boolean {
    return this[3].toBoolean();
  }
}

export class PayMyAPI__verifyMessageResult {
  value0: Address;
  value1: boolean;

  constructor(value0: Address, value1: boolean) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromBoolean(this.value1));
    return map;
  }
}

export class PayMyAPI extends ethereum.SmartContract {
  static bind(address: Address): PayMyAPI {
    return new PayMyAPI("PayMyAPI", address);
  }

  addPlan(
    pricePerSecond: BigInt,
    perMonthLimit: BigInt,
    perSecondLimit: BigInt
  ): BigInt {
    let result = super.call(
      "addPlan",
      "addPlan(int96,uint256,uint256):(uint256)",
      [
        ethereum.Value.fromSignedBigInt(pricePerSecond),
        ethereum.Value.fromUnsignedBigInt(perMonthLimit),
        ethereum.Value.fromUnsignedBigInt(perSecondLimit)
      ]
    );

    return result[0].toBigInt();
  }

  try_addPlan(
    pricePerSecond: BigInt,
    perMonthLimit: BigInt,
    perSecondLimit: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "addPlan",
      "addPlan(int96,uint256,uint256):(uint256)",
      [
        ethereum.Value.fromSignedBigInt(pricePerSecond),
        ethereum.Value.fromUnsignedBigInt(perMonthLimit),
        ethereum.Value.fromUnsignedBigInt(perSecondLimit)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  cfaV1(): PayMyAPI__cfaV1Result {
    let result = super.call("cfaV1", "cfaV1():(address,address)", []);

    return new PayMyAPI__cfaV1Result(
      result[0].toAddress(),
      result[1].toAddress()
    );
  }

  try_cfaV1(): ethereum.CallResult<PayMyAPI__cfaV1Result> {
    let result = super.tryCall("cfaV1", "cfaV1():(address,address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PayMyAPI__cfaV1Result(value[0].toAddress(), value[1].toAddress())
    );
  }

  chainlinkFee(): BigInt {
    let result = super.call("chainlinkFee", "chainlinkFee():(uint256)", []);

    return result[0].toBigInt();
  }

  try_chainlinkFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("chainlinkFee", "chainlinkFee():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  chainlinkJobId(): Bytes {
    let result = super.call("chainlinkJobId", "chainlinkJobId():(bytes32)", []);

    return result[0].toBytes();
  }

  try_chainlinkJobId(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "chainlinkJobId",
      "chainlinkJobId():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  checkUpkeep(param0: Bytes): PayMyAPI__checkUpkeepResult {
    let result = super.call("checkUpkeep", "checkUpkeep(bytes):(bool,bytes)", [
      ethereum.Value.fromBytes(param0)
    ]);

    return new PayMyAPI__checkUpkeepResult(
      result[0].toBoolean(),
      result[1].toBytes()
    );
  }

  try_checkUpkeep(
    param0: Bytes
  ): ethereum.CallResult<PayMyAPI__checkUpkeepResult> {
    let result = super.tryCall(
      "checkUpkeep",
      "checkUpkeep(bytes):(bool,bytes)",
      [ethereum.Value.fromBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PayMyAPI__checkUpkeepResult(value[0].toBoolean(), value[1].toBytes())
    );
  }

  getPlans(developer: Address): Array<PayMyAPI__getPlansResultValue0Struct> {
    let result = super.call(
      "getPlans",
      "getPlans(address):((int96,uint256,uint256,bool)[])",
      [ethereum.Value.fromAddress(developer)]
    );

    return result[0].toTupleArray<PayMyAPI__getPlansResultValue0Struct>();
  }

  try_getPlans(
    developer: Address
  ): ethereum.CallResult<Array<PayMyAPI__getPlansResultValue0Struct>> {
    let result = super.tryCall(
      "getPlans",
      "getPlans(address):((int96,uint256,uint256,bool)[])",
      [ethereum.Value.fromAddress(developer)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<PayMyAPI__getPlansResultValue0Struct>()
    );
  }

  interval(): BigInt {
    let result = super.call("interval", "interval():(uint256)", []);

    return result[0].toBigInt();
  }

  try_interval(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("interval", "interval():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lastTimeStamp(): BigInt {
    let result = super.call("lastTimeStamp", "lastTimeStamp():(uint256)", []);

    return result[0].toBigInt();
  }

  try_lastTimeStamp(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastTimeStamp",
      "lastTimeStamp():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  requestUpdate(developer: Address, user: Address): Bytes {
    let result = super.call(
      "requestUpdate",
      "requestUpdate(address,address):(bytes32)",
      [ethereum.Value.fromAddress(developer), ethereum.Value.fromAddress(user)]
    );

    return result[0].toBytes();
  }

  try_requestUpdate(
    developer: Address,
    user: Address
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "requestUpdate",
      "requestUpdate(address,address):(bytes32)",
      [ethereum.Value.fromAddress(developer), ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  verifyMessage(
    message: string,
    _address: Address,
    signature: Bytes
  ): PayMyAPI__verifyMessageResult {
    let result = super.call(
      "verifyMessage",
      "verifyMessage(string,address,bytes):(address,bool)",
      [
        ethereum.Value.fromString(message),
        ethereum.Value.fromAddress(_address),
        ethereum.Value.fromBytes(signature)
      ]
    );

    return new PayMyAPI__verifyMessageResult(
      result[0].toAddress(),
      result[1].toBoolean()
    );
  }

  try_verifyMessage(
    message: string,
    _address: Address,
    signature: Bytes
  ): ethereum.CallResult<PayMyAPI__verifyMessageResult> {
    let result = super.tryCall(
      "verifyMessage",
      "verifyMessage(string,address,bytes):(address,bool)",
      [
        ethereum.Value.fromString(message),
        ethereum.Value.fromAddress(_address),
        ethereum.Value.fromBytes(signature)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PayMyAPI__verifyMessageResult(
        value[0].toAddress(),
        value[1].toBoolean()
      )
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get host(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get token_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get link(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get oracle(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get updateInterval(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get chainlinkJobId_(): string {
    return this._call.inputValues[5].value.toString();
  }

  get chainlinkFee_(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddApiCall extends ethereum.Call {
  get inputs(): AddApiCall__Inputs {
    return new AddApiCall__Inputs(this);
  }

  get outputs(): AddApiCall__Outputs {
    return new AddApiCall__Outputs(this);
  }
}

export class AddApiCall__Inputs {
  _call: AddApiCall;

  constructor(call: AddApiCall) {
    this._call = call;
  }

  get message(): string {
    return this._call.inputValues[0].value.toString();
  }

  get url(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class AddApiCall__Outputs {
  _call: AddApiCall;

  constructor(call: AddApiCall) {
    this._call = call;
  }
}

export class AddPlanCall extends ethereum.Call {
  get inputs(): AddPlanCall__Inputs {
    return new AddPlanCall__Inputs(this);
  }

  get outputs(): AddPlanCall__Outputs {
    return new AddPlanCall__Outputs(this);
  }
}

export class AddPlanCall__Inputs {
  _call: AddPlanCall;

  constructor(call: AddPlanCall) {
    this._call = call;
  }

  get pricePerSecond(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get perMonthLimit(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get perSecondLimit(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class AddPlanCall__Outputs {
  _call: AddPlanCall;

  constructor(call: AddPlanCall) {
    this._call = call;
  }

  get planIndex(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class DeactivatePlanCall extends ethereum.Call {
  get inputs(): DeactivatePlanCall__Inputs {
    return new DeactivatePlanCall__Inputs(this);
  }

  get outputs(): DeactivatePlanCall__Outputs {
    return new DeactivatePlanCall__Outputs(this);
  }
}

export class DeactivatePlanCall__Inputs {
  _call: DeactivatePlanCall;

  constructor(call: DeactivatePlanCall) {
    this._call = call;
  }

  get index(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DeactivatePlanCall__Outputs {
  _call: DeactivatePlanCall;

  constructor(call: DeactivatePlanCall) {
    this._call = call;
  }
}

export class EatFromQuotaCall extends ethereum.Call {
  get inputs(): EatFromQuotaCall__Inputs {
    return new EatFromQuotaCall__Inputs(this);
  }

  get outputs(): EatFromQuotaCall__Outputs {
    return new EatFromQuotaCall__Outputs(this);
  }
}

export class EatFromQuotaCall__Inputs {
  _call: EatFromQuotaCall;

  constructor(call: EatFromQuotaCall) {
    this._call = call;
  }

  get user(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get count(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class EatFromQuotaCall__Outputs {
  _call: EatFromQuotaCall;

  constructor(call: EatFromQuotaCall) {
    this._call = call;
  }
}

export class FulfillRequestCall extends ethereum.Call {
  get inputs(): FulfillRequestCall__Inputs {
    return new FulfillRequestCall__Inputs(this);
  }

  get outputs(): FulfillRequestCall__Outputs {
    return new FulfillRequestCall__Outputs(this);
  }
}

export class FulfillRequestCall__Inputs {
  _call: FulfillRequestCall;

  constructor(call: FulfillRequestCall) {
    this._call = call;
  }

  get requestId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get developer(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get user(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get count(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class FulfillRequestCall__Outputs {
  _call: FulfillRequestCall;

  constructor(call: FulfillRequestCall) {
    this._call = call;
  }
}

export class PerformUpkeepCall extends ethereum.Call {
  get inputs(): PerformUpkeepCall__Inputs {
    return new PerformUpkeepCall__Inputs(this);
  }

  get outputs(): PerformUpkeepCall__Outputs {
    return new PerformUpkeepCall__Outputs(this);
  }
}

export class PerformUpkeepCall__Inputs {
  _call: PerformUpkeepCall;

  constructor(call: PerformUpkeepCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class PerformUpkeepCall__Outputs {
  _call: PerformUpkeepCall;

  constructor(call: PerformUpkeepCall) {
    this._call = call;
  }
}

export class RequestUpdateCall extends ethereum.Call {
  get inputs(): RequestUpdateCall__Inputs {
    return new RequestUpdateCall__Inputs(this);
  }

  get outputs(): RequestUpdateCall__Outputs {
    return new RequestUpdateCall__Outputs(this);
  }
}

export class RequestUpdateCall__Inputs {
  _call: RequestUpdateCall;

  constructor(call: RequestUpdateCall) {
    this._call = call;
  }

  get developer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get user(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RequestUpdateCall__Outputs {
  _call: RequestUpdateCall;

  constructor(call: RequestUpdateCall) {
    this._call = call;
  }

  get requestId(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class SubscribeCall extends ethereum.Call {
  get inputs(): SubscribeCall__Inputs {
    return new SubscribeCall__Inputs(this);
  }

  get outputs(): SubscribeCall__Outputs {
    return new SubscribeCall__Outputs(this);
  }
}

export class SubscribeCall__Inputs {
  _call: SubscribeCall;

  constructor(call: SubscribeCall) {
    this._call = call;
  }

  get developer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get planId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SubscribeCall__Outputs {
  _call: SubscribeCall;

  constructor(call: SubscribeCall) {
    this._call = call;
  }
}

export class UnsubscribeCall extends ethereum.Call {
  get inputs(): UnsubscribeCall__Inputs {
    return new UnsubscribeCall__Inputs(this);
  }

  get outputs(): UnsubscribeCall__Outputs {
    return new UnsubscribeCall__Outputs(this);
  }
}

export class UnsubscribeCall__Inputs {
  _call: UnsubscribeCall;

  constructor(call: UnsubscribeCall) {
    this._call = call;
  }

  get developer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UnsubscribeCall__Outputs {
  _call: UnsubscribeCall;

  constructor(call: UnsubscribeCall) {
    this._call = call;
  }
}

export class UpdateChainLinkFeeCall extends ethereum.Call {
  get inputs(): UpdateChainLinkFeeCall__Inputs {
    return new UpdateChainLinkFeeCall__Inputs(this);
  }

  get outputs(): UpdateChainLinkFeeCall__Outputs {
    return new UpdateChainLinkFeeCall__Outputs(this);
  }
}

export class UpdateChainLinkFeeCall__Inputs {
  _call: UpdateChainLinkFeeCall;

  constructor(call: UpdateChainLinkFeeCall) {
    this._call = call;
  }

  get chainlinkFee_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdateChainLinkFeeCall__Outputs {
  _call: UpdateChainLinkFeeCall;

  constructor(call: UpdateChainLinkFeeCall) {
    this._call = call;
  }
}

export class UpdateChainLinkJobIdCall extends ethereum.Call {
  get inputs(): UpdateChainLinkJobIdCall__Inputs {
    return new UpdateChainLinkJobIdCall__Inputs(this);
  }

  get outputs(): UpdateChainLinkJobIdCall__Outputs {
    return new UpdateChainLinkJobIdCall__Outputs(this);
  }
}

export class UpdateChainLinkJobIdCall__Inputs {
  _call: UpdateChainLinkJobIdCall;

  constructor(call: UpdateChainLinkJobIdCall) {
    this._call = call;
  }

  get chainlinkJobId_(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class UpdateChainLinkJobIdCall__Outputs {
  _call: UpdateChainLinkJobIdCall;

  constructor(call: UpdateChainLinkJobIdCall) {
    this._call = call;
  }
}

export class UpdateChainLinkOracleCall extends ethereum.Call {
  get inputs(): UpdateChainLinkOracleCall__Inputs {
    return new UpdateChainLinkOracleCall__Inputs(this);
  }

  get outputs(): UpdateChainLinkOracleCall__Outputs {
    return new UpdateChainLinkOracleCall__Outputs(this);
  }
}

export class UpdateChainLinkOracleCall__Inputs {
  _call: UpdateChainLinkOracleCall;

  constructor(call: UpdateChainLinkOracleCall) {
    this._call = call;
  }

  get oracle(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateChainLinkOracleCall__Outputs {
  _call: UpdateChainLinkOracleCall;

  constructor(call: UpdateChainLinkOracleCall) {
    this._call = call;
  }
}

export class UpdateChainLinkTokenCall extends ethereum.Call {
  get inputs(): UpdateChainLinkTokenCall__Inputs {
    return new UpdateChainLinkTokenCall__Inputs(this);
  }

  get outputs(): UpdateChainLinkTokenCall__Outputs {
    return new UpdateChainLinkTokenCall__Outputs(this);
  }
}

export class UpdateChainLinkTokenCall__Inputs {
  _call: UpdateChainLinkTokenCall;

  constructor(call: UpdateChainLinkTokenCall) {
    this._call = call;
  }

  get link(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateChainLinkTokenCall__Outputs {
  _call: UpdateChainLinkTokenCall;

  constructor(call: UpdateChainLinkTokenCall) {
    this._call = call;
  }
}

export class UpdateLastTimestampCall extends ethereum.Call {
  get inputs(): UpdateLastTimestampCall__Inputs {
    return new UpdateLastTimestampCall__Inputs(this);
  }

  get outputs(): UpdateLastTimestampCall__Outputs {
    return new UpdateLastTimestampCall__Outputs(this);
  }
}

export class UpdateLastTimestampCall__Inputs {
  _call: UpdateLastTimestampCall;

  constructor(call: UpdateLastTimestampCall) {
    this._call = call;
  }

  get timestamp(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdateLastTimestampCall__Outputs {
  _call: UpdateLastTimestampCall;

  constructor(call: UpdateLastTimestampCall) {
    this._call = call;
  }
}

export class UpdateSuperfluidTokenCall extends ethereum.Call {
  get inputs(): UpdateSuperfluidTokenCall__Inputs {
    return new UpdateSuperfluidTokenCall__Inputs(this);
  }

  get outputs(): UpdateSuperfluidTokenCall__Outputs {
    return new UpdateSuperfluidTokenCall__Outputs(this);
  }
}

export class UpdateSuperfluidTokenCall__Inputs {
  _call: UpdateSuperfluidTokenCall;

  constructor(call: UpdateSuperfluidTokenCall) {
    this._call = call;
  }

  get token_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateSuperfluidTokenCall__Outputs {
  _call: UpdateSuperfluidTokenCall;

  constructor(call: UpdateSuperfluidTokenCall) {
    this._call = call;
  }
}
