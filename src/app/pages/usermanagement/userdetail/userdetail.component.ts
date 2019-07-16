import { Component, OnInit } from '@angular/core';
import {EmplayeeUser} from '../../../models/User/emplayee';
import {ActivatedRoute} from '@angular/router';
import {EmployeeUserService} from '../../../services/usermanagement/employee.service';
import {LogisticStoreAuthorizeServiceService} from '../../../services/logisticstore/logistic-store-authorize-service.service';
import {LogisticStore} from '../../../models/LogisticStore/logistic-store';
import {BehaviorSubject} from 'rxjs';
import {UpdateModelType} from '../../../models/tms-data-entity';
import {UserStoreActionRequest} from '../../../models/User/user-store-action-request';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {EmitService} from '../../../help/emit-service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {


  public emplayeeUser: EmplayeeUser;

  public userstores = new BehaviorSubject<LogisticStore[]>([]);

  private savecommand: number; // 命令状态

  constructor( public emitService: EmitService, private route: ActivatedRoute, private employeeUserService: EmployeeUserService, private logisticStoreAuthorizeServiceService: LogisticStoreAuthorizeServiceService) { }

  ngOnInit() {

    const userid = this.route.snapshot.paramMap.get('id');

    // 获取用户信息
    this.employeeUserService.Detail(userid).subscribe((a) => {
      this.emplayeeUser = a;
    });

    // 获取网点信息
    this.logisticStoreAuthorizeServiceService.ByUserId(userid).subscribe((a) => {

      a.forEach((item, index) => {
        item.UpdateModelType = UpdateModelType.Attach;
      });

      console.log('我有的网点');
      console.log(a);
      this.userstores.next(a);
    });

    // this.route.params.subscribe((params: {id: string}) => {
    //   const userId = this.route.snapshot.paramMap.get('id');
    //
    //   employeeUserService.
    // });

  }

  saveaction() {

    switch (this.savecommand) {
      case 1:
        this.processuserinstore();
        break;
    }
  }

  changefunmodule($event: number) {

    this.savecommand = $event;

  }

  private processuserinstore(): void {

   const checkinsetdata =  this.userstores.getValue().filter((t => t.UpdateModelType === UpdateModelType.Insert));

   const checkdeldata = this.userstores.getValue().filter((t => t.UpdateModelType === UpdateModelType.Delete));

   if (checkinsetdata.length !== 0) {
     const addmode = new UserStoreActionRequest();
     addmode.ActionUserId = this.emplayeeUser.UserId;
     addmode.StoreIds = [];

     checkinsetdata.forEach((a, b) => {
       console.log(a);
       addmode.StoreIds.push(a.StoreId);
     });

     this.logisticStoreAuthorizeServiceService.adduthorstore(addmode).subscribe(a => {
       this.emitService.eventEmit.emit(
         new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));

     });
    }

   if (checkdeldata.length !== 0) {
       const delmode = new UserStoreActionRequest();
       delmode.ActionUserId = this.emplayeeUser.UserId;
       delmode.StoreIds = [];
       checkdeldata.forEach((a, b) => {
         delmode.StoreIds.push(a.StoreId);
       });

       this.logisticStoreAuthorizeServiceService.delauthorstore(delmode).subscribe(a => {
         this.emitService.eventEmit.emit(
           new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));

       });

     }

   }
}
