
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[app-div-flex]'
})
export class DivFlexDirective {

  @Input('statued') statued: boolean;
  @Input('wight') wight: number;
  constructor(private el: ElementRef) {
    this.el.nativeElement;
  }

}
