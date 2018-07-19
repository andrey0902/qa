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
  constructor() { }

  ngOnInit() {
  }

  public onEdit(order) {
    console.log('asd;lfjasd;f', order);
    this.editOrder.emit(order);
  }

}
