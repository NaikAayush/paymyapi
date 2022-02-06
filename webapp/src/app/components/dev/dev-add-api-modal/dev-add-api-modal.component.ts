import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev-add-api-modal',
  templateUrl: './dev-add-api-modal.component.html',
  styleUrls: ['./dev-add-api-modal.component.css'],
})
export class DevAddApiModalComponent implements OnInit {
  loading: boolean = false;
  message: string = '';
  api_url: string = '';
  constructor() {}

  ngOnInit(): void {}

  addAPI() {
    alert([this.message, this.api_url]);
    this.loading = true;
  }
}
