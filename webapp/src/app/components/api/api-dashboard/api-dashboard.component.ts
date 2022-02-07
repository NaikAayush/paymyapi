import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EthersService } from 'src/app/services/ethers/ethers.service';
import { TheGraphService } from 'src/app/services/the-graph/the-graph.service';

@Component({
  selector: 'app-api-dashboard',
  templateUrl: './api-dashboard.component.html',
  styleUrls: ['./api-dashboard.component.css'],
})
export class ApiDashboardComponent implements OnInit {
  id: any;

  apiExist: boolean = false;
  loading: boolean = false;
  result: any;

  constructor(
    private route: ActivatedRoute,
    private graph: TheGraphService,
    private ethersService: EthersService
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    const add: string = await this.ethersService.getAddress();
    this.result = await this.graph.getAPIs(this.id.toLowerCase());
    if (this.result?.data.apiRecords.length > 0) {
      this.apiExist = true;
    }
    this.loading = false;
  }
}
