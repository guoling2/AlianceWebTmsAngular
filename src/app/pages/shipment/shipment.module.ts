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
import { SendcarfeedetailinsertComponent } from './groupforInside/create/sub/sendcarfeedetailinsert/sendcarfeedetailinsert.component';
import {ShipplangroupModule} from '../../buinesscomponent/shipplangroup/shipplangroup.module';
import {GroundforinsideModule} from './groupforInside/groundforinside.module';
import { BenditihuolistComponent } from './benditihuolist/benditihuolist.component';




const routes: Routes = [

     {
    'path': '',
    'component': ShipmentlistComponent
     },
  {
    'path': 'benditihuoclist',
    'component': BenditihuolistComponent
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
    'path': 'circletrip',
    'component': CircletriplistComponent
  },
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
    ShipplangroupModule,
    GroundforinsideModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ListShipmentCommandModule,
    RouterModule

   ],
  // tslint:disable-next-line:max-line-length
  declarations: [ShiplentplanComponent, ShipmentlistComponent, CarryingStatuedPipePipe, CarryingTaskPipePipe, TglistComponent, XiecheComponent, CreateShipmentPlanComponent, XiechescanComponent, SignlistComponent, AddComponent, DetailComponent, NoselectedComponent, SignViewChangeDirective, DivFlexDirective, CircletriplistComponent, SendcarfeedetailinsertComponent, BenditihuolistComponent],
  entryComponents: [CreateShipmentPlanComponent, AddComponent, DetailComponent, NoselectedComponent]
})
export class ShipmentModule { }
