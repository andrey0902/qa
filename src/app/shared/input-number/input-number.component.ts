import { AfterViewInit, Component, ElementRef, forwardRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { HandlerErrorService } from '../services/handler-error.service';
export const INPUT_NUMBER_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputNumberComponent),
  multi: true,
};
@Component({
  selector: 'qa-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [INPUT_NUMBER_ACCESSOR]
})
export class InputNumberComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() public minValue = 0;
  @Input() public maxValue = 100;
  @Input() public step = 1;
  @Input() public decimal = false;
  @Input() public time = false;
  @Input() public defaultValue = null;

  @ViewChild('inputNumber') public inputNumber: ElementRef;
  ngControl: NgControl;
  public disabled: boolean;
  public focus = false;
  public countValue: number | string = 0;
  onChangeValue = (_: any) => { };
  onTouched = (_: any) => { };
  constructor(private inj: Injector,
              private handlerError: HandlerErrorService) { }

  ngOnInit() {
    this.ngControl = this.inj.get(NgControl);
  }

  ngAfterViewInit(): void {
    if (this.ngControl) {
      this.ngControl.valueChanges
        .subscribe(value => {
          if (value) {
            this.focus = false;
          }
        });
    }
  }

  public onChange(value) {
    this.onChangeValue(value);
    this.onTouched(true);
    this.countValue = value;
  }

  public numberIncrement() {
    if (this.countValue >= this.maxValue) {
      return;
    }
    this.countValue =  +this.countValue + this.step;

    this.countValue = this.countValue.toFixed(2);

    this.handlerChange();
  }

  public numberDecrement() {
    if (+this.countValue <= this.minValue) {
      return;
    }

    this.countValue = +this.countValue - this.step;

    this.countValue = +this.countValue.toFixed(2);

    this.handlerChange();
  }

  public timeIncrement() {
    const temNum =  this.getDecimal();

    if (temNum < 0.59) {
      this.countValue = +(+this.countValue + this.step).toFixed(2);
      this.countValue.toFixed(2);
    } else if (temNum === 0.59) {
      this.countValue = Math.trunc(+this.countValue) + 1.00;
    }

    this.handlerChange();
  }

  public timeDecrement() {
    const temNum =  this.getDecimal();

    if (temNum >= 0.01) {
      this.countValue = +(+this.countValue - this.step).toFixed(2);
    } else if (temNum === 0.00) {
      this.countValue = +((+this.countValue - 1) + 0.59).toFixed(2);
    }

    this.handlerChange();
  }

  public getDecimal() {
    return +((+this.countValue - Math.floor(+this.countValue)).toFixed(2));
  }

  public handlerChange() {
    this.writeValue(this.countValue);
    this.onChangeValue(this.countValue);
    this.onTouched(true);
  }

  public increment() {

    if (this.countValue >= this.maxValue) {
      return;
    }

    if (this.countValue < this.minValue) {
      this.setDefaultValue();
    }

    switch (this.time) {
      case true:
        this.timeIncrement();
        break;
      case false:
        this.numberIncrement();
        break;
    }
  }

  public decrement() {
    // this.setDefaultValue();

    if (+this.countValue <= this.minValue) {
      return;
    }

    switch (this.time) {
      case true:
        this.timeDecrement();
        break;
      case false:
        this.numberDecrement();
        break;
    }
  }

  writeValue(obj: any): void {
    const number = parseFloat(obj);
    if (number || number === 0) {
      this.setValue(number);
      this.countValue = number;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeValue = fn;
  }

  registerOnTouched(fn: any): void {
   this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onBlur() {
    this.focus = false;
  }

  public onFocus() {
    this.focus = true;
  }

  public setValue(value) {
    this.inputNumber.nativeElement.value = value;
  }

  public getErrorMessage(control: FormControl) {
    const errors = this.handlerError.getError(control);
    if (errors && errors.length) {
      return errors[0];
    }
  }

  public setDefaultValue() {
    if (this.defaultValue || this.defaultValue === 0) {
      this.countValue = this.defaultValue;
    }
  }

}
