import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageChangeService {
  private language = new Subject();

  public getLanguage$(): Observable<any> {
    return this.language.asObservable();
  }

  public setLanguage$(val: string) {
    this.language.next(val);
  }
}
