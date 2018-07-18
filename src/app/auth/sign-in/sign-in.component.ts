import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';

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
              private authService: AuthService) { }

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
    console.log('form', form.value);
    this.authService.login(form.value)
      .subscribe(val => {
        console.log(val);
      });
  }

}
