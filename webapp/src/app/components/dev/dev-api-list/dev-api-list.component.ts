import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-dev-api-list',
  templateUrl: './dev-api-list.component.html',
  styleUrls: ['./dev-api-list.component.css'],
})
export class DevApiListComponent implements OnInit {
  @Input() data: any;
  constructor(public modal: ModalService) {}

  ngOnInit() {
    console.log(this.data);
  }

  add() {
    this.modal.addNewPlanModal = true;
  }
}
