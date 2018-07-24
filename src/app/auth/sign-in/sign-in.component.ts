import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCoreService } from '../../core/services/auth-core.service';

@Component({
  selector: 'qa-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public signIn: FormGroup;
  public serverError: any;
  public hide = true;
  constructor(private fb: FormBuilder,
              private authService: AuthCoreService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm(): void {
    this.signIn = this.fb.group({
      username: null,
      email: null,
      password: null
    });
  }

  public onSubmit(form: FormGroup): void {
    this.authService.login(form.value)
      .subscribe(val => {
        this.router.navigate(['/']);
      },
        error => {
        this.serverError = error.error;
        });
  }

}
