import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { AuthService } from './shared/service/auth.service';
import { ServerErrorModule } from '../shared/server-error/server-error.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ServerErrorModule,
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  exports: [
    SignInComponent,
    SignUpComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
