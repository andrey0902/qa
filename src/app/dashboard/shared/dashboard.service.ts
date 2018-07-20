import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../core/config/config-service';
import { map, takeUntil } from 'rxjs/internal/operators';
import { OrderModel } from './order-model';
import { Observable, Subject } from 'rxjs/index';
import { HistoryModel } from './histor-model';
import { ProfileService } from '../../core/services/profile.service';
import { UserModel } from '../../core/model/User-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public onDestroy = new Subject();
  public user: UserModel;
  constructor(private http: HttpClient,
              private profileService: ProfileService) {
    this.getUser();
  }

  public getUser() {
    this.profileService.profileSource$
      .pipe(takeUntil(this.onDestroy))
      .subscribe(res => {
        this.user = res;
      });
  }

  public getListOrders(): Observable<OrderModel[]> {
    return this.http.get(ConfigService.ordersPath)
      .pipe(map((res: any) => {
        return this.filterListByUser(res.map(item => new OrderModel(item)));
      }));
  }

  public getHistoryOrders(): Observable<HistoryModel[]> {
    return this.http.get(ConfigService.ordersHistoryPath)
      .pipe(map((res: any) => {
        return res.map(item => new HistoryModel(item));
      }));
  }

  public createOrder(data) {
    data = this.prepareForm(data);
    return this.http.post(ConfigService.ordersPath, data)
      .pipe(map(res => {
        return res;
      }));
  }

  public deleteOrder(order: OrderModel) {
    return this.http.delete( `${ConfigService.ordersPath}${order.id}`);
  }

  public updateOrder(order: OrderModel) {
    order = this.prepareForm(order);
    return this.http.patch(`${ConfigService.ordersPath}${order.id}/`, order)
      .pipe(map(res => new OrderModel(res)));
  }

  public updateListOrders(orders: OrderModel[], order: OrderModel): OrderModel[] {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === order.id) {
        orders[i] = order;
        console.log('UPDATE LIST  ', orders[i]);
        break;
      }
    }
    return orders;
  }

  private prepareForm(data) {
    data.status = this.reformatValue(data.status);
    data.bid_type = this.reformatValue(data.bidType);
    return data;
  }

  private reformatValue(data): number {
    return data.id;
  }

  public filterListByUser(list: OrderModel[]) {
    return list.filter(order => {
      if (order.owner === this.user.id) {
        return order;
      }
    });
  }
}
