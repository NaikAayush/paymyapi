import { Component, OnInit } from '@angular/core';
import { EthersService } from 'src/app/services/ethers/ethers.service';
import { TheGraphService } from 'src/app/services/the-graph/the-graph.service';

@Component({
  selector: 'app-dev-dashboard',
  templateUrl: './dev-dashboard.component.html',
  styleUrls: ['./dev-dashboard.component.css'],
})
export class DevDashboardComponent implements OnInit {
  apiExist: boolean = false;
  loading: boolean = false;
  result: any;

  constructor(
    private graph: TheGraphService,
    private ethersService: EthersService
  ) {}

  async ngOnInit() {
    this.loading = true;
    const add: string = await this.ethersService.getAddress();
    this.result = await this.graph.getAPIs(add.toLowerCase());
    if (this.result?.data.apiRecords.length > 0) {
      this.apiExist = true;
    }
    this.loading = false;
  }
}
