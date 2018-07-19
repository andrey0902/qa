import {
  AfterViewInit, Component, ElementRef, forwardRef, Host, Injector, Input, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {HandlerErrorService} from '../services/handler-error.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export const INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'qa-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [INPUT_VALUE_ACCESSOR]
})
export class InputComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {
  public onDestroy$ = new Subject();
  @Input() public style;
  @Input() public type = 'text';
  @Input() public placeholder;
  @Input() public textMask;
  @ViewChild('simpleInput') public simpleInput: ElementRef;
  public ngControl: NgControl;
  public disabled: boolean;
  public focus = false;
  public value = '';
  onChangeValue = (_: any) => { };
  onTouched = (_: any) => { };
  constructor(
              private inj: Injector,
              private handlerError: HandlerErrorService) { }

  ngOnInit() {
    this.ngControl = this.inj.get(NgControl);
  }

  ngAfterViewInit(): void {
    if (this.ngControl) {
      this.ngControl.valueChanges
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(value => {
          if (value) {
            this.focus = false;
          }
        });
    }
  }

  public onChange(value) {
    this.value = value;
    this.onChangeValue(value);
    this.onTouched(true);
  }

  registerOnChange(fn: any): void {
    this.onChangeValue = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: string): void {
    this.value = obj;
    this.onChangeValue(obj);
    this.onTouched(false);
  }

  public getErrorMessage(control: FormControl) {
    return this.handlerError.getError(control);
  }

  public blurFocus() {
    this.focus = true;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
