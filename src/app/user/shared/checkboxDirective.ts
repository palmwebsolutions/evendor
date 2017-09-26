import { Directive, Output, EventEmitter, Input, SimpleChange} from '@angular/core';

@Directive({ selector: '[onCreate]'})
export class OnCreate {
  @Output() 
  onCreate:EventEmitter<any> = new EventEmitter();
  ngAfterContentInit() {
    this.onCreate.emit(null);
  }
}