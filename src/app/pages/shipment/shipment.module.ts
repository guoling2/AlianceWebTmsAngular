import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { ShipmentlistComponent } from './list/shipmentlist.component';
import {ListShipmentCommandModule} from './list/command/list-shipment-command.module';
import {CarryingStatuedPipePipe} from '../../models/shipment/carrying-statued-pipe.pipe';
import {CarryingTaskPipePipe} from '../../models/shipment/carrying-tasktype-pipe.pipe';
import {ShiplentplanComponent} from './planlist/shiplentplan.component';
import { TglistComponent } from './tongchenglist/tglist.component';
import { XiecheComponent } from './xieche/xieche.component';
import {CreateShipmentPlanComponent} from './command/createshipmentplan/createshipmentplan.component';
import {LogistictoreModule} from '../../buinesscomponent/logistore/logistictore.module';
import { XiechescanComponent } from './xiechescan/xiechescan.component';
import { SignlistComponent } from './signlist/signlist.component';
import { AddComponent } from './signlist/add/add.component';
import { DetailComponent } from './signlist/detail/detail.component';
import {DialogModule} from '@syncfusion/ej2-angular-popups';
import {UploaderModule} from '@syncfusion/ej2-angular-inputs';
import { NoselectedComponent } from './signlist/noselected/noselected.component';
import { SignViewChangeDirective } from './signlist/sign-view-change.directive';
import { DivFlexDirective } from './signlist/div-flex.directive';
import { InsidePlanGroupCreateComponent } from './groupforInside/create/create.component';
import { CircletriplistComponent } from './circletriplist/circletriplist.component';
import {ShipplangroupModule} from '../../buinesscomponent/shipplangroup/shipplangroup.module';
import { BenditihuolistComponent } from './benditihuolist/benditihuolist.component';
import { TihuoinsertComponent } from './benditihuolist/tihuoinsert/tihuoinsert.component';
import { GroupinsdecommomlistComponent } from './groupforInside/sendgroupinsidecommonlist/sub/groupinsdecommomlist/groupinsdecommomlist.component';
import { SendsonghuolistforsonghuoComponent } from './groupforInside/sendsonghuolistforsonghuo/sendsonghuolistforsonghuo.component';
import { SendsonghuolistfortransferComponent } from './groupforInside/sendsonghuolistfortransfer/sendsonghuolistfortransfer.component';
// tslint:disable-next-line:max-line-length
import { SendsonghuolistforcircleriptripComponent } from './groupforInside/sendsonghuolistforcircleriptrip/sendsonghuolistforcircleriptrip.component';
import { SendsonghuolistforouterComponent } from './groupforoutside/sendsonghuolistforouter/sendsonghuolistforouter.component';
import { ShipplangroudattchlistComponent } from './groupforInside/sendgroupinsidecommonlist/sub/shipplangroudattchlist/shipplangroudattchlist.component';
import {SelectdriverComponent} from './groupforInside/sub/selectdriver/selectdriver.component';
import {SelectorderComponent} from './groupforInside/sub/selectorder/selectorder.component';
import {SelectvehicelComponent} from './groupforInside/sub/selectvehicel/selectvehicel.component';
import {HeaditemComponent} from './groupforInside/create/sub/headitem/headitem.component';
import {LogisticitemsComponent} from './groupforInside/create/sub/logisticitems/logisticitems.component';
import {SendsonghuolistfortihuoComponent} from './groupforInside/sendsonghuolistfortihuo/sendsonghuolistfortihuo.component';
import { SgroupinsidelistComponent } from './groupforInside/sendgroupinsidecommonlist/sgroupinsidelist.component';




const routes: Routes = [

     {
    'path': '',
    'component': ShipmentlistComponent
     },

  {
    'path': 'tglist',
    'component': TglistComponent
  },
  {
    'path': 'xieche',
    'component': XiecheComponent
  },
  {
    'path': 'xieche-scan',
    'component': XiechescanComponent
  },
  {
    'path': 'sign-list',
    'component': SignlistComponent
  },
  {
    'path': 'benditihuoclist', // 提货
    'component': SendsonghuolistfortihuoComponent
  },
  {
    'path': 'songhuo', // 送货
    'pathMatch': 'full',
    'component': SendsonghuolistforsonghuoComponent
  },
  {
    'path': 'circletriptrip', // 干线运输
    'pathMatch': 'full',
    'component': SendsonghuolistforcircleriptripComponent
  },
  {
    'path': 'transfer', // 网点转运
    'pathMatch': 'full',
    'component': SendsonghuolistfortransferComponent
  },
  {
    'path': 'outer', // 外包
    'pathMatch': 'full',
    'component': SendsonghuolistforouterComponent
  },
  //
  // {
  //   'path': 'send/:id',
  //
  //   children: [
  //    { path: 'songhuo', component: SendsonghuolistforsonghuoComponent },
  //    { path: 'transfer', component: SendsonghuolistforcircleriptripComponent },
  //     { path: 'outer', component: SendsonghuolistforouterComponent }
  //      ]
  //   },
  {
    'path': 'shipgroup-inside-create/:id',
    'component': InsidePlanGroupCreateComponent
  }
];



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ListShipmentCommandModule,
    RouterModule.forChild(routes),
    LogistictoreModule,
    DialogModule,
    UploaderModule,
    ShipplangroupModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ListShipmentCommandModule,
    RouterModule

   ],
  // tslint:disable-next-line:max-line-length
  declarations: [
    SelectdriverComponent,
    SelectorderComponent,
    SelectvehicelComponent,
    InsidePlanGroupCreateComponent,
    HeaditemComponent,
    LogisticitemsComponent,
    LogisticitemsComponent,
    SendsonghuolistfortihuoComponent,
    // tslint:disable-next-line:max-line-length
    ShiplentplanComponent,
    ShipmentlistComponent,
    CarryingStatuedPipePipe,
    CarryingTaskPipePipe,
    TglistComponent,
    XiecheComponent,
    CreateShipmentPlanComponent,
    XiechescanComponent,
    SignlistComponent,
    AddComponent,
    DetailComponent,
    NoselectedComponent,
    SignViewChangeDirective,
    DivFlexDirective,
    CircletriplistComponent,
    BenditihuolistComponent,
    TihuoinsertComponent,
    GroupinsdecommomlistComponent,
    SendsonghuolistforsonghuoComponent,
    SendsonghuolistfortransferComponent,
    SendsonghuolistforcircleriptripComponent,
    SendsonghuolistforouterComponent,
    ShipplangroudattchlistComponent,
    SgroupinsidelistComponent],
  entryComponents: [CreateShipmentPlanComponent, AddComponent, DetailComponent, NoselectedComponent, ShipplangroudattchlistComponent,
    SelectdriverComponent, SelectorderComponent, SelectvehicelComponent]
})
export class ShipmentModule { }
