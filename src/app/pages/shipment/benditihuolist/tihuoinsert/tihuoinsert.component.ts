import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VehicelTaskTypeDataSource} from '../../../../modeldata/vehicel-task-type';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-biz-tihuoinsert',
  templateUrl: './tihuoinsert.component.html',
  styleUrls: ['./tihuoinsert.component.css']
})
export class TihuoinsertComponent implements OnInit {


  public saveform: FormGroup;
  vehicelTaskTypeDataSource = new VehicelTaskTypeDataSource();

  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }


  ngOnInit() {

    this.saveform = this.fb.group({
      TaskTypeDesc: [{ value: this.vehicelTaskTypeDataSource.XieCheTihuo().TaskTypeName, disabled: true }],
      SendCarTime: new Date()
    });


  }


  savedata() {

    console.log(this.saveform.getRawValue());
  }

}
