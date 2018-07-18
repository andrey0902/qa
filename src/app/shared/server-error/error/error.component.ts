import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'qa-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnChanges {
  @Input() public errorName: string;
  @Input() public control: FormControl;
  @Input() public form: FormGroup;
  @Input() errors: any;
  public error: any;
  constructor() { }

  ngOnInit() {
    this.formChange();
    this.fieldError(this.errorName);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fieldError(this.errorName);
  }

  public fieldError(name) {
    console.log(this.errorName);
    console.log(this.errors);
    if (this.errors[name] && this.errors[name][0]) {
      this.error = this.errors[name][0];
      setTimeout(() => {
        this.form.setErrors({noneField: true});
      }, 5);
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
