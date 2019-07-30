import {Injectable} from '@angular/core';
import {LogisticItemModel} from '../../../models/shipment/logistic-item-model';
import {BehaviorSubject} from 'rxjs';
import {UpdateModelType} from '../../../models/tms-data-entity';

@Injectable({
  providedIn: 'root'
})
export class LogisticItemComponentService {



  public LogisticItemSource: LogisticItemModel[];


  public LogisiticItemAddBehavior: BehaviorSubject<LogisticItemModel>;
  constructor() {

    this.LogisticItemSource = [];

    this.LogisiticItemAddBehavior = new BehaviorSubject<LogisticItemModel>(null);
   // this.LogisticItemModelObservble=new Observable<LogisticItemModel[]>();
  }


   public  AttchItem(item: LogisticItemModel): void {



    item.UpdateModelType = UpdateModelType.Insert;

    if (this.LogisticItemSource.findIndex(t => t.ShipmentId === item.ShipmentId) === -1) {
      this.LogisiticItemAddBehavior.next(item);
      this.LogisticItemSource.push(item);
      console.log('添加了');
    }

   // this.LogisticItemModelObservble
  }

   public  RemoveAttchItem(ShipmentId: string): void {

     const index = this.LogisticItemSource.findIndex(t => t.ShipmentId == ShipmentId);

     this.LogisticItemSource.splice(index, 1);

   }
}

