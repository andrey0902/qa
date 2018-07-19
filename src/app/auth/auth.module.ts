import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { AuthService } from './shared/service/auth.service';
import { ServerErrorModule } from '../shared/server-error/server-error.module';
import { ServerNonErrorModule } from '../shared/server-error-non/server-error.module';
import { AuthCoreService } from '../core/services/auth-core.service';

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
    ServerNonErrorModule,
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
    AuthService,
    AuthCoreService,
  ]
})
export class AuthModule { }
