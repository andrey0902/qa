import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { SessionService } from './session-service';

import { ConfigService } from '../configs/config.service';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../model/User-model';

@Injectable()
export class ProfileService {
  public profileSource: BehaviorSubject<any> = new BehaviorSubject(null);
  public emailUser = null;
  public user = null;
  constructor(private http: HttpClient) {
    this.createUserModel();
  }

  public getUser$() {
    return Observable.create(observer => {
      observer.next(this.user);
    });
  }

  public get profileSource$(): Observable<UserModel> {
    return this.profileSource.asObservable();
  }

  public createUserModel() {
    if (SessionService.getUser()) {
      this.profileSource.next(new UserModel(SessionService.getUser()));
    }
  }

  public update(user) {
    SessionService.setUser(user);
    this.profileSource.next(new UserModel(user));
  }

  public updateUser(data) {
    return this.http.patch(ConfigService.userDataPath, data)
      .pipe(tap((response: any) => {
          this.update(response.data);
        }),
        map((response: any) => new UserModel(response.data) ));
  }

  public getUserAccount(): Observable<UserModel> {
    return this.http.get(ConfigService.userDataPath)
      .pipe(tap((response: any) => {
        if (response.data) {
          this.update(response.data);
        }
      }), map((response: any) => {
        return new UserModel(response.data);
      }));
  }
}
