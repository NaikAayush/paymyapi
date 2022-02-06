import { Component, OnInit } from '@angular/core';
import { openCloseAnimation } from 'src/app/services/animation/animation.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
  animations: [openCloseAnimation],
})
export class AuthModalComponent implements OnInit {
  modalShow: boolean = false;
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.modalShow = true;
    }, 1000);
  }

  async login() {}
}
