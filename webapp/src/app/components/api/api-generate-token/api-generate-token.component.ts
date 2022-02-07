import { Component, Input, OnInit } from '@angular/core';
import { EthersService } from 'src/app/services/ethers/ethers.service';

@Component({
  selector: 'app-api-generate-token',
  templateUrl: './api-generate-token.component.html',
  styleUrls: ['./api-generate-token.component.css'],
})
export class ApiGenerateTokenComponent implements OnInit {
  loading: boolean = false;
  @Input() message: string = '';
  key: any;
  constructor(private ethersService: EthersService) {}

  ngOnInit(): void {}
  async sign() {
    const signature = await this.ethersService.signMessage(this.message);
    const address = await this.ethersService.getAddress();
    this.key = btoa(address + ':' + signature);
    console.log(this.key);
  }
}
