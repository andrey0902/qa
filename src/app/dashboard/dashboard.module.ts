import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddOrderComponent } from './add-order/add-order.component';
import { HeaderModule } from '../shared/header/header.module';
import { ProfileService } from '../core/services/profile.service';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatIconModule,
  MatMenuModule
} from '@angular/material';
import { InputModule } from '../shared/input/input.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from '../shared/input-number/input-number.module';
import { SelectModule } from '../shared/select/select.module';
import { OrdersBayComponent } from './orders-bay/orders-bay.component';
import { HistoryOrdersComponent } from './history-orders/history-orders.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderModule,
    MatButtonModule,
    InputModule,
    InputNumberModule,
    SharedModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    SelectModule,
    MatCardModule,
  ],
  declarations: [
    DashboardComponent,
    AddOrderComponent,
    OrdersBayComponent,
    HistoryOrdersComponent
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    ProfileService
  ],
  entryComponents: [
    AddOrderComponent
  ]
})
export class DashboardModule { }
