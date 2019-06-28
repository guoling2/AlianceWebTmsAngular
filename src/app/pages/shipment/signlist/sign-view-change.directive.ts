import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[sign-change-host]'
})
export class SignViewChangeDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
