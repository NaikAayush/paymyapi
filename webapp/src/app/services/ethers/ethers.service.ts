import { Injectable } from '@angular/core';
import { BigNumber, ContractInterface, ethers, utils } from 'ethers';
declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class EthersService {
  provider: any;
  signer: any;
  utils = utils;

  constructor() {
    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    }
  }

  async initEthers() {
    if (window.ethereum) {
      await this.provider.send('eth_requestAccounts', []);
      this.signer = this.provider.getSigner();
    }
  }

  async isLoggedIn() {
    const accounts = await this.provider.listAccounts();
    if (accounts.length > 0) {
      this.initEthers();
    }
    return accounts.length > 0;
  }

  async decodeData(typesArray: Array<string>, raw_log_data: string) {
    const abiCoder = new utils.AbiCoder();
    const decodedParameters = abiCoder.decode(typesArray, raw_log_data);
    return decodedParameters;
  }

  toWei(amount: string) {
    return this.utils.parseEther(amount).toString();
  }

  fromWei(amount: BigNumber) {
    return this.utils.formatEther(amount).toString();
  }
}
