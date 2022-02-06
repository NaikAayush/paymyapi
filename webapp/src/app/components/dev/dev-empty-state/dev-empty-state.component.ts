import { Component, OnInit } from '@angular/core';
import { openCloseAnimation } from 'src/app/services/animation/animation.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-dev-empty-state',
  templateUrl: './dev-empty-state.component.html',
  styleUrls: ['./dev-empty-state.component.css'],
  animations: [openCloseAnimation],
})
export class DevEmptyStateComponent implements OnInit {
  constructor(public modal: ModalService) {}

  ngOnInit(): void {}

  addNew() {
    this.modal.addNewAPIModal = true;
  }
}
