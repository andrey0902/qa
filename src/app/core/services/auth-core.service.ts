import { Injectable } from '@angular/core';
import { SessionService } from './session-service';
import { Router } from '@angular/router';
import { UserModel } from '../model/User-model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config-service';

@Injectable({
  providedIn: 'root'
})
export class AuthCoreService {

  constructor(private router: Router,
              private http: HttpClient) { }

  public isLogin(): boolean {
    return !!SessionService.getUser() && SessionService.getKey();
  }

  public logOut() {
    SessionService.setUser(null);
    SessionService.setKey(null);
    this.sendLogUot().subscribe(res => {
      this.router.navigate(['/auth/sign-in']);
    });
  }

  public getToken(): string {
    return  SessionService.getKey() ? SessionService.getKey() : null;
  }

  public setStorage(data) {
    SessionService.setUser(data.user);
    SessionService.setKey(data.token);
  }

  public login(data) {
    return this.http.post(ConfigService.signInPath, data)
      .pipe(tap(res => {
        this.setStorage(res);
      }), map((res: any) => {
        return new UserModel(res.user);
      }));
  }

  public signUp(data) {
    return this.http.post(ConfigService.signUpPath, data)
      .pipe(map(val => {
        console.log('val', val);
        return val;
      }));
  }

  public sendLogUot() {
    return this.http.get(ConfigService.logoutPath);
  }
}
