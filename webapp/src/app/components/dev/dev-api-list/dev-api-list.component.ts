import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev-api-list',
  templateUrl: './dev-api-list.component.html',
  styleUrls: ['./dev-api-list.component.css'],
})
export class DevApiListComponent implements OnInit {
  @Input() data: any;
  constructor() {}

  ngOnInit() {
    console.log(this.data);
  }
}
