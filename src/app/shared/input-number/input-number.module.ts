import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberComponent } from './input-number.component';
import { MatButtonModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    DirectivesModule,

  ],
  declarations: [
    InputNumberComponent,
  ],
  exports: [
    InputNumberComponent
  ]
})
export class InputNumberModule { }
