import {Injectable, EventEmitter, OnInit} from '@angular/core';
@Injectable()
export class EmitService implements OnInit, IEmitService {
  public eventEmit: any;

  constructor() {
    // 定义发射事件
    this.eventEmit = new EventEmitter();


  }

  ngOnInit() {

  }

  emit ( value: any) {

    console.log('发射了');

    this.eventEmit.eventEmit.emit(value);
  }
}
export  interface IEmitService {


  emit(value: any);
}
