import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../core/config/config-service';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators';
import { AuthCoreService } from '../../../core/services/auth-core.service';
import { UserModel } from '../../../core/model/User-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private authCoreService: AuthCoreService) { }

}
