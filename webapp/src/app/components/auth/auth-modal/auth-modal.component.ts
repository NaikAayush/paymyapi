import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private ethersService: EthersService, private router: Router) {}

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
    await this.ethersService.initEthers();
    this.router.navigateByUrl('dev');
  }
}
