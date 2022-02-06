import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract/contract.service';
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
  constructor(public modal: ModalService, private contract: ContractService) {}

  ngOnInit(): void {}

  async addAPI() {
    this.loading = true;
    await this.contract.addAPI(this.message, this.api_url);
    this.loading = false;
    this.modal.addNewAPIModal = false;
  }

  cancel() {
    this.modal.addNewAPIModal = false;
  }
}
