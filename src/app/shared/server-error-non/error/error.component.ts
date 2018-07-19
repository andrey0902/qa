import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'qa-error-non',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorNonComponent implements OnInit, OnChanges {
  @Input() public errorName: string;
  @Input() public control: FormControl;
  @Input() public form: FormGroup;
  @Input() errors: any;
  public error: any;
  constructor() { }

  ngOnInit() {
    this.formChange();
    this.noneError();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.noneError();
  }

  public noneError() {
    if (this.errors[this.errorName]) {
      this.error = this.errors[this.errorName];
      if (this.form) {
        setTimeout(() => {
          this.form.setErrors({noneField: true});
        }, 5);
      }
    }
  }

  public formChange() {
    if (this.form) {
      this.form.valueChanges
        .pipe(take(1))
        .subscribe(val => {
          this.error = null;
        });
    }
  }

}
