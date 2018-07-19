import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../core/config/config-service';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getListOrders() {
    return this.http.get(ConfigService.ordersPath)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  public getHistoryOrders() {
    return this.http.get(ConfigService.ordersHistoryPath)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
