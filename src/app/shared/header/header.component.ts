import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProfileService } from '../../core/services/profile.service';
import { AuthCoreService } from '../../core/services/auth-core.service';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '../../core/services/language-change.service';

@Component({
  selector: 'qa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public onDestroy = new Subject();
  public user;
  public languageControl: FormControl;
  public language = 'en';
  constructor(private profileService: ProfileService,
              private authService: AuthCoreService,
              public translate: TranslateService,
              public languageService: LanguageChangeService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang(this.language);

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.createControl();
    this.getUser();
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
  }

  public getUser() {
    this.profileService.profileSource$
      .pipe(takeUntil(this.onDestroy))
      .subscribe(res => {
        this.user = res;
      });
  }

  public createControl() {
    this.languageControl = new FormControl(this.translate.currentLang);

    this.languageControl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(val => {
        console.log('Language', val);
        this.languageService.setLanguage$(val);
      });
  }

  public logOut() {
    this.authService.logOut();
  }

  public setLanguage(val: string) {
    this.languageService.setLanguage$(val);
    this.language = val;
  }

}
