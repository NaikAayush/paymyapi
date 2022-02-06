import { Component, OnInit } from '@angular/core';
import { openCloseAnimation } from 'src/app/services/animation/animation.service';
import { EthersService } from 'src/app/services/ethers/ethers.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
  animations: [openCloseAnimation],
})
export class AuthModalComponent implements OnInit {
  modalShow: boolean = false;
  constructor(private ethersService: EthersService) {}

  async ngOnInit() {
    if (await this.ethersService.isLoggedIn()) {
      this.modalShow = false;
    } else {
      setTimeout(() => {
        this.modalShow = true;
      }, 1000);
    }
  }

  async login() {
    this.ethersService.initEthers();
  }
}
