import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProfileService } from '../../core/services/profile.service';
import { AuthCoreService } from '../../core/services/auth-core.service';
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
  public language = 'en';
  public hideMenu = false;
  private listUrl = ['/auth/sign-in', '/auth/sign-up'];
  constructor(private profileService: ProfileService,
              private authService: AuthCoreService,
              public translate: TranslateService,
              public languageService: LanguageChangeService,
              public router: Router) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang(this.language);

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.getUser();
    this.isHideMenu();
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

  public logOut() {
    this.authService.logOut();
  }

  public setLanguage(val: string) {
    this.languageService.setLanguage$(val);
    this.language = val;
  }

  public isHideMenu() {
    this.hideMenu = this.listUrl.includes(this.router.url);
  }

}
