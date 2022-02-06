import { Component, OnInit } from '@angular/core';
import { EthersService } from './services/ethers/ethers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'webapp';

  constructor(private ethersService: EthersService) {}
  async ngOnInit() {
    // await this.ethersService.initEthers();
    // await this.ethersService.signMessage('hi');
  }
}
