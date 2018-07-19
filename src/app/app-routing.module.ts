import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule',
      },
      {
        path: '',
        pathMatch: 'full',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }
    ], {
      useHash: true,
      // enableTracing: true
    })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
