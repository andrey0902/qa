import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutSideDirective } from './click-out-side.directive';
import { InsertComponentDirective } from './insert-component.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ClickOutSideDirective,
    InsertComponentDirective
  ],
  exports: [
    ClickOutSideDirective,
    InsertComponentDirective
  ]
})
export class DirectivesModule { }
