import { Component, OnInit } from '@angular/core';
import { DashboardService } from './shared/dashboard.service';

@Component({
  selector: 'qa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getListOrders()
      .subscribe(val => {
        console.log('orders', val);
      });

    this.dashboardService.getHistoryOrders()
      .subscribe(val => {
        console.log(val);
      });
  }

}
