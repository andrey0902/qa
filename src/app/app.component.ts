import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from './core/services/language-change.service';
import { takeUntil } from 'rxjs/internal/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'qa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public onDestroy = new Subject();
  constructor(public translate: TranslateService,
              public languageService: LanguageChangeService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.languageService.getLanguage$()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(val => {
        this.translate.use(val);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
  }
}
