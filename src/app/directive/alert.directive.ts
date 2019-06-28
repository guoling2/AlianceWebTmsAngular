import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[alert-host]'
})
export class AlertDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
