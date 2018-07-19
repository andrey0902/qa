import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef,
  HostListener, Injector, Input, OnChanges, OnInit, SimpleChanges
} from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from './shared/type';
import { SelectService } from './shared/service/select.service';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { HandlerErrorService } from '../services/handler-error.service';
import { SelectOptionModel } from './shared/selectOption.model';

@Component({
  selector: 'qa-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    SelectService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    }]
})
export class SelectComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  @Input() settings: IMultiSelectSettings;
  @Input() texts: IMultiSelectTexts;
  @Input() public options: any[];

  public initialize = false;
  public oldOption;
  public get isVisible() {
    return this._isVisible;
  }
  public set isVisible(val: boolean) {
    this._isVisible = val;
    this._workerDocClicked = val ? false : this._workerDocClicked;
  }
  get focusBack(): boolean {
    return this.settings.focusBack && this._focusBack;
  }
  defaultSettings: IMultiSelectSettings = {
    closeOnClickOutside: true,
    isMultiple: true,
    isShoveChecked: true,
    pullRight: false,
    enableSearch: false,
    searchRenderLimit: 0,
    searchRenderAfter: 1,
    searchMaxLimit: 0,
    searchMaxRenderedItems: 0,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-primary dropdown-toggle',
    containerClasses: 'dropdown-inline',
    selectionLimit: 0,
    minSelectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: false,
    showUncheckAll: false,
    fixedTitle: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
    isLazyLoad: false,
    stopScrollPropagation: false,
    loadViewDistance: 1,
    selectAddedValues: false,
    ignoreLabels: false,
    maintainSelectionOrderInTitle: false,
    focusBack: true
  };
  defaultTexts: IMultiSelectTexts = {
    checkAll: 'All',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };
  public filteredOptions: IMultiSelectOption[] = [];
  public title: string;
  public disabled = false;
  public dropdownOpened = new EventEmitter();
  public dropdownClosed = new EventEmitter();
  public type: any;
  public ngControl: FormControl;
  focusedItem: IMultiSelectOption | undefined;
  private _isVisible = false;
  public focus = false;
  private _workerDocClicked = false;
  _focusBack = false;
  constructor(private el: ElementRef,
              private service: SelectService,
              private inject: Injector,
              private handlerError: HandlerErrorService,
              private chd: ChangeDetectorRef) {
    this.settings = this.defaultSettings;

    this.texts = this.defaultTexts;
  }

  ngOnInit() {
    this.title = this.texts.defaultTitle || '';
    this.service.settings = this.settings;
    this.getControl();
    if ( this.options && typeof this.options[0] === 'string') {
      this.type = 'string';
      this.service.type = 'string';
      const tempArray = [];
      for (const item of this.options) {
        tempArray.push(new SelectOptionModel ({
          id: item,
          name: item,
          value: item
        }));
      }
      this.options = tempArray;
      this.oldOption = this.options;
      this.chd.markForCheck();
      this.initialize = true;
    } else {
      this.initialize = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.options && typeof this.options[0] === 'string') {
      this.type = 'string';
      this.service.type = 'string';
      const tempArray = [];
      for (const item of this.options) {
        tempArray.push(new SelectOptionModel ({
          id: item,
          name: item,
          value: item
        }));
      }
      this.options = tempArray;
      this.oldOption = tempArray;
      this.initialize = true;
    } else {
      this.initialize = true;
    }
  }

  public getControl() {
    this.ngControl = this.inject.get(NgControl);
  }

  public hideError() {
    if (this.ngControl) {
      this.ngControl.valueChanges
        .subscribe(value =>  {
          this.focus = false;
        });
    }
  }

  @HostListener('document: click', ['$event.target'])
  @HostListener('document: touchstart', ['$event.target'])
  onClick(target: HTMLElement) {
    if (!this.settings.closeOnClickOutside) { return; }

     if (!this.el.nativeElement.contains(target)) {
       this.closet();
     }
  }

  writeValue(obj: IMultiSelectOption[]): void {
    if (obj !== null && obj !== undefined && obj) {
      this.service.setAllModel(obj);
      this.service.updatePath(this.options);
      this.updateTitle();
    }
    if (obj === null) {
      this.service.removeAllModel();
      this.service.updatePath(this.options);
      this.updateTitle();
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState( isDisabled: boolean ): void {
    this.disabled = isDisabled;
  }

  public propagateChange = (_: any) => { };
  onTouched = (_: any) => { };

  public toggleDropdown(e: Event) {
    this.onTouched(true);
    if (this.disabled) {
      return;
    }
    // this.service.maybeStopPropagation(e);

    if (this.isVisible) {
      this._focusBack = true;
    }

    this.isVisible = !this.isVisible;
    this.isVisible ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
    this.focus = this.isVisible ? !this.isVisible : false;
    this.focusedItem = undefined;
  }

  public onSelect(event) {
    this.updateTitle();
    this.propagateChange(this.service.getModel());
    // this.updateTitle();
    // if (this.settings.isMultiple) {
    //   this.propagateChange(this.service.getModel());
    // } else {
    //   this.propagateChange(this.service.getModel()[0]);
    // }

     if (this.settings.closeOnSelect) {
       this.closet();
     }
  }

  private updateTitle() {

    // show default title
    if (!this.service.getModel()) {
      this.title = this.texts.defaultTitle;
      return;
    }

    const countTitleShow = this.settings.dynamicTitleMaxItems;
    if (!this.settings.isMultiple && this.type === 'string') {
      const string = this.service.updateTitle(countTitleShow);
      if (string === '') {
        this.title = this.texts.defaultTitle;
      } else {
        this.title = string;
      }

    }

    if (this.service.getModel().length <= countTitleShow || (this.service.getModel() && !this.settings.isMultiple)) {
      const string = this.service.updateTitle(countTitleShow);
      if (string === '') {
        this.title = this.texts.defaultTitle;
      } else {
        this.title = string;
      }
    }
  }

  public getErrorMessage(control: FormControl) {
    return this.handlerError.getError(control);
  }

  ngAfterViewInit(): void {
    this.hideError();
  }

  public closet() {
    this.isVisible = false;
    this._focusBack = true;
    this.dropdownClosed.emit();
    this.focus = true;
  }

  public getSearch(event) {
    if (event !== '' && event !== null) {
      this.options = this.oldOption;
      this.options = this.options.filter(option => {
        if (option.value.toLowerCase().indexOf(event.toLowerCase()) !== -1) {
          return option;
        }
      });
    } else {
      this.options = this.oldOption;
      this.chd.detectChanges();
    }
  }
}
