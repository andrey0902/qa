import {
  ComponentFactory, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, Input, Output,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[oddsInsertComponent]'
})
export class InsertComponentDirective {
  @Input() component: any;
  @Output() destroy = new EventEmitter();
  @Output() create = new EventEmitter();
  private isInsert = false;
  constructor(private el: ElementRef,
              private viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  @HostListener('click') public toggleComponent() {
    if (this.isInsert) {
      this.clear();
      this.destroy.emit(true);
      this.isInsert = true;
    } else {
      this.insert();
      this.create.emit(true);
      this.isInsert = false;
    }
  }

  public insert() {
    const component: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(this.component);

    const componentIns = this.viewContainer.createComponent(component);
    componentIns.instance.viewContainer = this.viewContainer;

  }


  public clear() {
    this.viewContainer.clear();
    this.destroy.emit(true);
  }

}
