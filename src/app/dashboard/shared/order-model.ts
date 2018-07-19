import { StatusModel } from './status-model';

enum BidType {
   1 = 'Selling',
   2 = 'Buying'
 }

 enum Status {
  1 = 'Opened',
  2 = 'Pending',
  3 = 'Closed',
 }

export class OrderModel {
  public bidType: number;
  public cost: string;
  public name: string;
  public status: string;
  public quantity: number;

  constructor(data) {
    this.cost = data.cost;
    this.bidType = [new StatusModel({id: data.bid_type, name: BidType[data.bid_type] }, true)];
    this.name = data.name;
    this.status = [new StatusModel({id: data.status, name: Status[data.status] }, true)];
    this.quantity = data.quantity;
  }
}
