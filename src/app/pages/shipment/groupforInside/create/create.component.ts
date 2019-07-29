import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {LogisticStore} from '../../../../models/LogisticStore/logistic-store';
import {ActivatedRoute} from '@angular/router';
import {VehicelTaskTypeDataSource} from '../../../../modeldata/vehicel-task-type';
import {GroupOrderAtionModel} from '../group-order-ation-model';

@Component({
  selector: 'app-app-shipmentinsidegroup-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class InsidePlanGroupCreateComponent implements OnInit {

  public saveform: FormGroup;
  vehicelTaskTypeDataSource = new VehicelTaskTypeDataSource();





  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }


  ngOnInit() {

    const selecttasktype = this.vehicelTaskTypeDataSource.selecttasktype(this.route.snapshot.paramMap.get('id'));

    this.saveform = this.fb.group({
      TaskTypeDesc: [{ value: selecttasktype.TaskTypeName, disabled: true }],
      SendCarTime: new Date()
    });


  }


  savedata() {

    console.log(this.saveform.getRawValue());
  }
}
