import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  addNewAPIModal: boolean = false;
  addNewPlanModal: boolean = false;
  generateTokenModal: boolean = false;
  constructor() {}
}
