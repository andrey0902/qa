import { Injectable } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { RegExpService } from './reg-exp.service';

@Injectable()
export class OddsValidators extends Validators {

  constructor() {
    super();
  }
  public static checkEmail(control: AbstractControl): {[key: string]: any} {
    if (control.value !== null) {
      if (control.value.length > 0) {
        return !RegExpService.email.test(control.value) ? {patternEmail: true} : null;
      }
    }
  }

  public static passwordMatch(control: AbstractControl) {
    const password = control.get('password').value;
    const confirm = control.get('confirmPassword').value;
    if (confirm && password) {
      if (password !== confirm) {
        control.get('confirmPassword').setErrors({passwordMatch: true});
      } else {
        return null;
      }
    }
  }

  public static dependencyFilter(from: string, to: string) {
    return (control: AbstractControl) => {
      const controlFrom = +control.get(from).value;
      const controlTo = +control.get(to).value;

      if (controlFrom < controlTo) {
       // control.get(to).setErrors( null);
      } else {
        control.get(to).setErrors({lessValue: true});
      }
    };

  }

  public static minValue(val: number) {
    return (control: AbstractControl) => {

      if (!control) {
        return;
      }

      if (control.value >= val) {
        return null;
      } else {
        return {minValue: val};
      }
    };
  }

  public static maxValue(val: number) {
    return (control: AbstractControl) => {

      if (!control) {
        return null;
      }
      if (control.value <= val) {
        return null;
      } else {
        return {maxValue: val};
      }
    };
  }

  public static correctDecimal(control: AbstractControl) {
    if (!control) {
      return null;
    }

    const value = control.value;

    if (value) {
      const res = OddsValidators.getDecimal(value);
      if (res && res >= 0.6) {
        return {
          timeDecimalError: 'incorrect time'
        };
      }
    }

    return null;

  }

  public static getDecimal(num) {
    return +((+num - Math.floor(+num)).toFixed(2));
  }
}
