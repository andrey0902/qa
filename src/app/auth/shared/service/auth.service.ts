import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../core/config/config-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(data) {
    return this.http.post(ConfigService.signInPath, data);
  }

  public signUp(data) {
    return this.http.post(ConfigService.signUpPath, data)
      .pipe(map(val => {
        console.log('val', val);
        return val;
      }));
  }
}
