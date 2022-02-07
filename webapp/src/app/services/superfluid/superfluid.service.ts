import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
declare let window: any;
import { Framework } from '@superfluid-finance/sdk-core';

@Injectable({
  providedIn: 'root',
})
export class SuperfluidService {
  sf: any;
  constructor() {}

  async startFlow(sender: string, receiver: string, flowRate: string) {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const sf = await Framework.create({
      networkName: 'mumbai',
      provider: provider,
    });
    const x = await sf.cfaV1
      .createFlow({
        sender: sender,
        receiver: receiver,
        superToken: '0x42bb40bf79730451b11f6de1cba222f17b87afd7',
        flowRate: flowRate,
      })
      .exec(signer);
    console.log(x);

    let userAddress = await signer.getAddress();
    console.log('a', userAddress);
  }

  async stopFlow() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const sf = await Framework.create({
      networkName: 'mumbai',
      provider: provider,
    });
    const x = await sf.cfaV1
      .deleteFlow({
        sender: '0x63e09bD18Fbf71e5cF68f6Aaa4F6Dc2F6Ea41f41',
        receiver: '0xd8199B80f78FADF8e60e9F14631473378B0b3a96',
        superToken: '0x42bb40bf79730451b11f6de1cba222f17b87afd7',
      })
      .exec(signer);
    console.log(x);

    let userAddress = await signer.getAddress();
    console.log('a', userAddress);
  }
}
