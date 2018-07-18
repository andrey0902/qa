import { Injectable } from '@angular/core';
import { SessionService } from './session-service';
import { Router } from '@angular/router';
import { UserModel } from '../model/User-model';

@Injectable({
  providedIn: 'root'
})
export class AuthCoreService {

  constructor(private router: Router) { }

  public isLogin(): boolean {
    return !!SessionService.getUser() && SessionService.getKey();
  }

  public logOut() {
    SessionService.setUser(null);
    SessionService.setKey(null);
    this.router.navigate(['/auth/sign-in']);
  }

  public getUser() {
    const user = SessionService.getUser();
    return user ? new UserModel(user) : null;
  }

  public getToken(): string {
    return  SessionService.getKey() ? SessionService.getKey() : null;
  }
}
