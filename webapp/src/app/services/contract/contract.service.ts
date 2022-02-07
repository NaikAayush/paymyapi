import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EthersService } from '../ethers/ethers.service';
import PayMyAPI from '../../../assets/abis/PayMyAPI.json';
import IERC from '../../../assets/abis/IERC.json';
import { ContractInterface } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  payMyAPIContract: any;
  IERCContract: any;
  account: any;

  constructor(private ethersService: EthersService) {}

  async initContracts() {
    this.payMyAPIContract = await this.ethersService.initSignerContract(
      environment.contractAddress,
      PayMyAPI as ContractInterface
    );
    this.IERCContract = await this.ethersService.initSignerContract(
      '0x42bb40bf79730451b11f6de1cba222f17b87afd7',
      IERC as ContractInterface
    );
  }

  async addAPI(message: string, url: string) {
    await this.initContracts();
    this.account = await this.ethersService.provider.send(
      'eth_requestAccounts',
      []
    );
    // console.log(this.account[0]);
    // console.log(this.ethersService.utils.parseEther(amount).toString());
    // const tx = await this.rupyaSignerContract.approve(
    //   environment.stakeContractAddress,
    //   this.ethersService.utils.parseEther(amount).toString()
    // );
    // await tx.wait();
    const tx = await this.payMyAPIContract.addApi(message, url);
    await tx.wait();
  }

  async addPlan(
    pricePerSecond: number,
    perMonthLimit: number,
    perSecondLimit: number
  ) {
    await this.initContracts();
    this.account = await this.ethersService.provider.send(
      'eth_requestAccounts',
      []
    );
    // console.log(this.account[0]);
    // console.log(this.ethersService.utils.parseEther(amount).toString());
    // const tx = await this.rupyaSignerContract.approve(
    //   environment.stakeContractAddress,
    //   this.ethersService.utils.parseEther(amount).toString()
    // );
    // await tx.wait();
    const tx = await this.payMyAPIContract.addPlan(
      pricePerSecond,
      perMonthLimit,
      perSecondLimit
    );
    await tx.wait();
  }

  async subscribe(address: string, planId: number) {
    await this.initContracts();
    this.account = await this.ethersService.provider.send(
      'eth_requestAccounts',
      []
    );
    // let tx = await this.IERCContract.approve(
    //   environment.contractAddress,
    //   this.ethersService.utils.parseEther('100').toString()
    // );
    // await tx.wait();
    const tx = await this.payMyAPIContract.subscribe(address, planId);
    await tx.wait();

    // await this.initContracts();
    // this.account = await this.ethersService.provider.send(
    //   'eth_requestAccounts',
    //   []
    // );
    // console.log(this.account[0]);
    // console.log(this.ethersService.utils.parseEther(amount).toString());
  }
}
