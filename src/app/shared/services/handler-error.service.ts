import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class HandlerErrorService {
  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message,
    'patternEmail' : () => 'Is not correct email',
    'passwordMatch': () => 'Passwords do not match',
    'lessValue': () => 'Choose bigger number',
    'maxValue': (params) => 'Max value is ' + params,
    'minValue': (params) => 'Min value is ' + params,
    'timeDecimalError': (params) => 'Incorrect time format',
  };
  constructor() {
  }

  public getError(control: FormControl) {
   return Object.keys(control.errors)
      .map(field => {
        return this.getMessage(field, control.errors[field]);
      });
  }

  private getMessage(type: string, params: any) {
    return HandlerErrorService.errorMessages[type](params);
  }
}
