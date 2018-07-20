import { OrderModel } from './order-model';

export class HistoryModel {
  public buyingOrder;
  public quantity: number;
  public sellingOrder;

  constructor(data) {
    this.quantity = data.quantity;
    this.buyingOrder = data.buying_order ? new OrderModel(data.buying_order) : null;
    this.sellingOrder = data.selling_order ? new OrderModel(data.selling_order) : null;

  }
}

