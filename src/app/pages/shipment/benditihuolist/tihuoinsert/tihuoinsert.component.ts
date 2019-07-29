import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VehicelTaskTypeDataSource} from '../../../../modeldata/vehicel-task-type';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {GroupOrderAtionModel} from '../../groupforInside/group-order-ation-model';
import {LogisticItemServiceService} from '../../sub/logisticitems/logistic-item-service.service';
import {UpdateModelType} from '../../../../models/tms-data-entity';

@Component({
  selector: 'app-biz-tihuoinsert',
  templateUrl: './tihuoinsert.component.html',
  styleUrls: ['./tihuoinsert.component.css']
})
export class TihuoinsertComponent implements OnInit {


  public saveform: FormGroup;
  vehicelTaskTypeDataSource = new VehicelTaskTypeDataSource();
  @Input() orderStoreSubject: BehaviorSubject<GroupOrderAtionModel>;
  constructor(private itemServiceService:LogisticItemServiceService,private fb: FormBuilder, private route: ActivatedRoute) { }


  ngOnInit() {

    this.saveform = this.fb.group({
      TaskTypeDesc: [{ value: this.vehicelTaskTypeDataSource.XieCheTihuo().TaskTypeName, disabled: true }],
      SendCarTime: new Date()
    });


    this.orderStoreSubject.subscribe((a:GroupOrderAtionModel)=>{

      if (a!=null){
        this.itemServiceService.AttchItem({
          DesctcustomName: "DesctcustomName", DestLinkman: "DestLinkman", LogisticFee: 0,
          ActionStoreName: "ActionStoreName",
          BeginLogisticStoreName: "BeginLogisticStoreName",
          EndArea: "EndArea",
          EndStoreName: "EndStoreName",
          OrigincustomLinkman: "OrigincustomLinkman",
          Origincustomname: "Origincustomname",
          PlanOrderItemCount: 0,
          PlanOrderItemVol: 0,
          PlanOrderItemWeight: 0,
          SquenceId: 0,
          TrackServerId: "TrackServerId",
          UpdateModelType: UpdateModelType.Attach,
          ShipmentId:'ShipmentId',

          ShipmentPlanId:'ShipmentPlanId'

        });
      }
    });
  }


  savedata() {

    console.log(this.saveform.getRawValue());
  }

}
