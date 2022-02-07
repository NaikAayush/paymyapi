import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { EthersService } from './services/ethers/ethers.service';
import { SuperfluidService } from './services/superfluid/superfluid.service';
import { TheGraphService } from './services/the-graph/the-graph.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'webapp';

  constructor(
    private ethersService: EthersService,
    private readonly graph: TheGraphService,
    private superfluid: SuperfluidService
  ) {}
  // async ngOnInit() {
  //   // await this.ethersService.initEthers();
  //   // await this.ethersService.signMessage('hi');
  // }
  async ngOnInit() {
    // await this.superfluid.stopFlow();
    // const add: string = await this.ethersService.getAddress();
    // console.log(await this.graph.getAPIs(add.toLowerCase()));
  }
}
