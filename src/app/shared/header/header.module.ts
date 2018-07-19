import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoModule } from '../logo/logo.module';

import { HeaderComponent } from './header.component';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    LogoModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
