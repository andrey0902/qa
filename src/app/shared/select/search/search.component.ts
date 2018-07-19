import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'qa-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public settings;
  @Input() public texts;
  @Output() search: EventEmitter<string> = new EventEmitter();
  public filterControl: FormControl;
  public destroyed$ = new Subject();
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.createControl();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.el.nativeElement && this.el.nativeElement.focus) {
        this.el.nativeElement.querySelector('.form-control').focus();
      }
    }, 100);
  }

  public createControl() {
    this.filterControl = new FormControl(null);
    this.subscribeChangeValue();
  }

  public subscribeChangeValue() {
    this.filterControl.valueChanges
      .pipe(debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroyed$))
      .subscribe(val => {
        this.search.emit(val);
      });
  }

  public clearSearch(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.filterControl.patchValue(null);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
