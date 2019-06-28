
import { Directive, ElementRef, AfterViewChecked, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[alert-is-hidden]'
})
export class AlerthiddenDirective implements AfterViewChecked {

  constructor(public el: ElementRef, public render: Renderer2, @Inject(DOCUMENT) private document) {

  }
  ngAfterViewChecked() {

      console.log(this.el);
    console.log(this.render);
    console.log(this.document);

  }


}
