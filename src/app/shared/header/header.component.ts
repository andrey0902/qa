import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProfileService } from '../../core/services/profile.service';
import { AuthCoreService } from '../../core/services/auth-core.service';

@Component({
  selector: 'qa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public onDestroy = new Subject();
  public user;
  constructor(private profileService: ProfileService,
              private authService: AuthCoreService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
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

  public logOut() {
    this.authService.logOut();
  }

}
