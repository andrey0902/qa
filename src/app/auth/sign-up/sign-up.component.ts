import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCoreService } from '../../core/services/auth-core.service';

@Component({
  selector: 'qa-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUp: FormGroup;
  public serverError: any;
  public hide = true;
  constructor(private fb: FormBuilder,
              private authService: AuthCoreService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.signUp = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password1: [null, [Validators.required]],
      password2: [null, [Validators.required]],
    });
  }

  public onSubmit(form: FormGroup) {
    this.authService.signUp(form.value)
      .subscribe(res => {
        this.router.navigate(['/auth/sign-in']);
      }, error => {
        this.serverError = error.error;
      });
  }
}
