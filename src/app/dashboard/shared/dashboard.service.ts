import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../core/config/config-service';
import { map } from 'rxjs/internal/operators';
import { OrderModel } from './order-model';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getListOrders(): Observable<OrderModel> {
    return this.http.get(ConfigService.ordersPath)
      .pipe(map((res: any) => {
        return res.map(item => new OrderModel(item));
      }));
  }

  public getHistoryOrders() {
    return this.http.get(ConfigService.ordersHistoryPath)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  public createOrder(data) {
    data = this.prepareForm(data);
    return this.http.post(ConfigService.ordersPath, data)
      .pipe(map(res => {
        return res;
      }));
  }

  private prepareForm(data) {
    data.status = this.reformatValue(data.status);
    data.bid_type = this.reformatValue(data.bidType);
    return data;
  }

  private reformatValue(data): number {
    return data.id;
  }
}
