import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EthersService } from '../ethers/ethers.service';
import PayMyAPI from '../../../assets/abis/PayMyAPI.json';
import { ContractInterface } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  payMyAPIContract: any;
  account: any;

  constructor(private ethersService: EthersService) {}

  async initContracts() {
    this.payMyAPIContract = await this.ethersService.initSignerContract(
      environment.contractAddress,
      PayMyAPI as ContractInterface
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
}
