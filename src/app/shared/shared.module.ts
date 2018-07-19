import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegExpService } from './services/reg-exp.service';
import { OddsValidators } from './services/odds-validators.service';
import { HandlerErrorService } from './services/handler-error.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  imports: [
    DirectivesModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    RegExpService,
    OddsValidators,
    HandlerErrorService
  ]
})
export class SharedModule { }
