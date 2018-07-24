import { Injectable } from '@angular/core';
import { SessionService } from './session-service';
import { Router } from '@angular/router';
import { UserModel } from '../model/User-model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config-service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCoreService {

  constructor(private router: Router,
              private http: HttpClient,
              private profileService: ProfileService) { }

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
      .pipe(tap((res: any) => {
        this.setStorage(res);
        this.profileService.profileSource.next(new UserModel(res.user));
      }), map((res: any) => {
        return new UserModel(res.user);
      }));
  }

  public signUp(data) {
    return this.http.post(ConfigService.signUpPath, data)
      .pipe(map(val => {
        return val;
      }));
  }

  public sendLogUot() {
    return this.http.get(ConfigService.logoutPath);
  }
}
