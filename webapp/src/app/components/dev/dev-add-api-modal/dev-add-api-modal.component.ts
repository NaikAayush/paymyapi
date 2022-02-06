import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-dev-add-api-modal',
  templateUrl: './dev-add-api-modal.component.html',
  styleUrls: ['./dev-add-api-modal.component.css'],
})
export class DevAddApiModalComponent implements OnInit {
  loading: boolean = false;
  message: string = '';
  api_url: string = '';
  constructor(public modal: ModalService) {}

  ngOnInit(): void {}

  addAPI() {
    alert([this.message, this.api_url]);
    this.loading = true;
  }

  cancel() {
    this.modal.addNewAPIModal = false;
  }
}
