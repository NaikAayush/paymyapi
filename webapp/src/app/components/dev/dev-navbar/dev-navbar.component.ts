import { Component, OnInit } from '@angular/core';
import { EthersService } from 'src/app/services/ethers/ethers.service';

@Component({
  selector: 'app-dev-navbar',
  templateUrl: './dev-navbar.component.html',
  styleUrls: ['./dev-navbar.component.css'],
})
export class DevNavbarComponent implements OnInit {
  address: string = '';
  newAddress: string = '';
  constructor(private ethersService: EthersService) {}

  async ngOnInit() {
    this.address = await this.ethersService.getAddress();
    this.newAddress =
      this.address.slice(0, 7) + '....' + this.address.slice(-3);
  }
}
