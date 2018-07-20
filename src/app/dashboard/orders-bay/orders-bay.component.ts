import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderModel } from '../shared/order-model';

@Component({
  selector: 'qa-orders-bay',
  templateUrl: './orders-bay.component.html',
  styleUrls: ['./orders-bay.component.scss']
})
export class OrdersBayComponent implements OnInit {
  @Input() orders: OrderModel[];
  @Output() public editOrder = new EventEmitter<OrderModel>();
  @Output() public deleteOrder = new EventEmitter<OrderModel>();
  constructor() { }

  ngOnInit() {
  }

  public onEdit(order) {

    this.editOrder.emit(order);
  }

  public onDelete(order) {
    console.log('asd;lfjasd;f', order);
    this.deleteOrder.emit(order);
  }

}
