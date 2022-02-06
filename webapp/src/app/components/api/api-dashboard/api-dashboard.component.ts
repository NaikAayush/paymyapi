import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-api-dashboard',
  templateUrl: './api-dashboard.component.html',
  styleUrls: ['./api-dashboard.component.css'],
})
export class ApiDashboardComponent implements OnInit {
  id: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
