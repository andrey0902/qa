import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoModule } from '../logo/logo.module';

import { HeaderComponent } from './header.component';
import { MatButtonModule, MatIconModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    LogoModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
