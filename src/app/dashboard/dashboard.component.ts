import { Component, OnInit } from '@angular/core';
import { DashboardService } from './shared/dashboard.service';
import { AddOrderComponent } from './add-order/add-order.component';
import { MatDialog } from '@angular/material';
import { OrderModel } from './shared/order-model';

@Component({
  selector: 'qa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public orders: OrderModel[];
  constructor(private dashboardService: DashboardService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getOrders();

    this.dashboardService.getHistoryOrders()
      .subscribe(val => {
        console.log(val);
      });
  }

  public getOrders(): void {
    this.dashboardService.getListOrders()
      .subscribe((val: OrderModel[]) => {
        console.log('orders', val);
        this.orders = val;
      });
  }

  public openModal(order?) {
    const dialogRef = this.dialog.open(AddOrderComponent, {
      width: '350px',
      data: {
        order: order ? order : null
      }
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value && value.edit) {

        this.updateOrder(value.data);

      } else if (value && value.data) {

        this.createOrder(value.data);

      }
    });
  }

  public onEditOrder(order: OrderModel) {
    console.log(order);
    this.openModal(order);
  }

  public createOrder(data) {
    this.dashboardService.createOrder(data)
      .subscribe(val => {
        console.log(val);
      });
  }

  public updateOrder(data) {

  }

}
