import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LogisticStore} from '../../../../../models/LogisticStore/logistic-store';
import {BehaviorSubject} from 'rxjs';
import {LogisticStoreServiceService} from '../../../../../services/logisticstore/logisticstoreservice';
import {TmaIndicatorService} from '@syncfusion/ej2-angular-charts';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {DataManager} from '@syncfusion/ej2-data';
import {UpdateModelType} from '../../../../../models/tms-data-entity';

@Component({
  selector: 'app-user-store',
  templateUrl: './userinstore.component.html',
  styleUrls: ['./userinstore.component.css']
})
export class UserinstoreComponent implements OnInit {


  @Input() logisticStoreSubject: BehaviorSubject<LogisticStore[]>;

  public unassignedStore: LogisticStore[] = []; // 未添加的网点

  public assignedStores: LogisticStore[] = []; // 已添加的网点


  public storefields: Object = { value: 'StoreId', text: 'StoreName' };

  private needaddstoreids: string[] = [];
  private  deletestoreids: string[] = [];

  @ViewChild('unassignedStorelist', {static: false})
  public unassignedStorelist: DropDownListComponent;

  constructor(private logisticStoreServiceService: LogisticStoreServiceService) {
  }

  ngOnInit() {


    this.assignedStores = this.logisticStoreSubject.getValue();
    // tslint:disable-next-line:no-shadowed-variable
    //  this.logisticStoreSubject.getValue().forEach((item, index) => {
    //
    //    this.assignedStores[item.StoreId] = item;
    //
    //  });

    this.logisticStoreServiceService.StoreQuery().subscribe((a) => {

      a.forEach((item, index) => {
        const  x = this.assignedStores.filter(t => t.StoreId === item.StoreId);
        if (x.length === 0) {
          this.unassignedStore.push(item);
        }
      });

    });
  }

  addstore() {

    const selectstoreid = this.unassignedStorelist.value;

     if (selectstoreid == null) {
       return;
     }

     let deleteindex = -1;

     this.unassignedStore.forEach((item, index) => {

       if (item.StoreId === selectstoreid) {

         const checkresult = this.assignedStores.find(t => t.StoreId === item.StoreName);
         if (checkresult === undefined) {
           item.UpdateModelType = UpdateModelType.Insert;
           this.assignedStores.push(item);

           deleteindex = index;
         }
       }

     });

     this.updatestore();

     if (deleteindex !== -1) {
       this.unassignedStore.splice(deleteindex, 1);
     }

    // (this.unassignedStorelist.dataSource as []). splice(0, 1);

     if (this.unassignedStore.length !== 0) {
       this.unassignedStorelist.value = this.unassignedStore[0].StoreId;
     }

      this.unassignedStorelist.refresh();

  }

  remorestore(logisticStore: LogisticStore) {


    const deleteindex = this.assignedStores.indexOf(logisticStore);

       if (logisticStore.UpdateModelType === UpdateModelType.Attach) {

         logisticStore.UpdateModelType = UpdateModelType.Delete;

         this.assignedStores[deleteindex] = logisticStore;

         return;

       } else {
         if (deleteindex > -1) {

           this.assignedStores.splice(deleteindex, 1);

           this.unassignedStore.push(logisticStore);

         }
       }
       this.updatestore();
  }

  updatestore() {
    // const _roles = [];
    //
    // _roles =  this.assignedStores;
    this.logisticStoreSubject.next(this.assignedStores);
  }
}
