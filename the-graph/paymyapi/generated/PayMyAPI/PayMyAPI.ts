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