import { Injectable } from '@angular/core';
import {LogisticItemModel} from './logistic-item-model';
import {BehaviorSubject, Observable} from 'rxjs';
import {GroupOrderAtionModel} from '../../groupforInside/group-order-ation-model';
import {UpdateModelType} from '../../../../models/tms-data-entity';

@Injectable({
  providedIn: 'root'
})
export class LogisticItemServiceService {



  public LogisticItemSource: LogisticItemModel[];


  public LogisiticItemAddBehavior:BehaviorSubject<LogisticItemModel>;
  constructor() {

    this.LogisticItemSource=[];

    this.LogisiticItemAddBehavior=new BehaviorSubject<LogisticItemModel>(null);
   // this.LogisticItemModelObservble=new Observable<LogisticItemModel[]>();
  }


   public  AttchItem(item:LogisticItemModel):void {

     this.LogisiticItemAddBehavior.next(item);



     this.LogisticItemSource.push(item);



    console.log('添加了');
   // this.LogisticItemModelObservble
  }

   public  RemoveAttchItem(ShipmentId:string):void {

     var index =this.LogisticItemSource.findIndex(t => t.ShipmentId == ShipmentId);

     this.LogisticItemSource.splice(index, 1);

   }
}

