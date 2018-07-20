import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './services/profile.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ProfileService
  ]
})
export class CoreModule { }
