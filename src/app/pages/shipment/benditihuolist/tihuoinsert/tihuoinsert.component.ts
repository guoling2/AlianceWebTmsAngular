import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VehicelTaskTypeDataSource} from '../../../../modeldata/vehicel-task-type';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {GroupOrderAtionModel} from '../../groupforInside/group-order-ation-model';
import {UpdateModelType} from '../../../../models/tms-data-entity';
import {LogisticItemService} from '../../../../services/logistic/shipment/logistic-item.service';
import {LogisticItemComponentService} from '../../../../services/logistic/shipment/logistic-item-service.component';

@Component({
  selector: 'app-biz-tihuoinsert',
  templateUrl: './tihuoinsert.component.html',
  styleUrls: ['./tihuoinsert.component.css']
})
export class TihuoinsertComponent implements OnInit {


  public saveform: FormGroup;
  vehicelTaskTypeDataSource = new VehicelTaskTypeDataSource();
  @Input() orderStoreSubject: BehaviorSubject<GroupOrderAtionModel>;
  constructor(private logisticItemService: LogisticItemService, private itemServiceService: LogisticItemComponentService, private fb: FormBuilder, private route: ActivatedRoute) { }


  ngOnInit() {

    this.saveform = this.fb.group({
      TaskTypeDesc: [{ value: this.vehicelTaskTypeDataSource.XieCheTihuo().TaskTypeName, disabled: true }],
      SendCarTime: new Date()
    });


    this.orderStoreSubject.subscribe((a: GroupOrderAtionModel) => {

      if (a != null) {

        this.logisticItemService.detail(a.ShipmentId, '').subscribe(item => {
          this.itemServiceService.AttchItem(item);
        });
      }
    });
  }


  savedata() {

    console.log(this.saveform.getRawValue());
  }

}
