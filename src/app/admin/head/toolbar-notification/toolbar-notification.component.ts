import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ToolbarNotificationService} from './toolbar-notification.service';

@Component({
  selector: 'app-toolbar-notification',
  templateUrl: './toolbar-notification.component.html',
  styleUrls: ['./toolbar-notification.component.scss']
})
export class ToolbarNotificationComponent implements OnInit {

  cssPrefix = 'toolbar-notification';
  isOpen = false;
  notifications = [];

  constructor(private  service: ToolbarNotificationService, private _elementRef: ElementRef) {


  }
  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(
      targetElement
    );
    if (!clickedInside) {
      this.isOpen = false;
    }
  }

  select() {
    this.notifications = this.service.select();
  }
  delete(event, notification) {
    event.stopPropagation();

    this.notifications = this.service.delete(notification);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit() {

    this.select();
  }

}
