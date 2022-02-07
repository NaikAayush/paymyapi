import { Component, Input, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract/contract.service';
import { EthersService } from 'src/app/services/ethers/ethers.service';

@Component({
  selector: 'app-api-list-plans',
  templateUrl: './api-list-plans.component.html',
  styleUrls: ['./api-list-plans.component.css'],
})
export class ApiListPlansComponent implements OnInit {
  @Input() data: any;
  @Input() idx: number | undefined;
  constructor(private ethersService: EthersService) {}

  ngOnInit() {
    // console.log(this.data.length);
    console.log(this.data);
  }
}
