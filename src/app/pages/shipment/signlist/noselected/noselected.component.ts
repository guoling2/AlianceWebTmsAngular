import {Component, ElementRef, OnInit} from '@angular/core';
import {SignBaseView} from '../sign-base-view';

@Component({
  selector: 'app-sign-noselected',
  templateUrl: './noselected.component.html',
  styleUrls: ['./noselected.component.css']
})
export class NoselectedComponent implements OnInit, SignBaseView  {

  constructor(private elementRef: ElementRef) {
    console.log( this.elementRef.nativeElement.parentElement);
   // alert( this.elementRef.nativeElement.parentElement.);
  }

  OrderLogisticDetailId: string;
  OrderTrackServerId: string;
  ViewType: 'NoData';

  ngOnInit() {
  }

}
