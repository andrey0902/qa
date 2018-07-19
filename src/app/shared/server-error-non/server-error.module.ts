import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNonComponent } from './error/error.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ErrorNonComponent],
  exports: [ErrorNonComponent],
})
export class ServerNonErrorModule { }
