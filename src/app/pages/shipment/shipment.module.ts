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




const routes: Routes = [

     {
    'path': '',
    'component': ShipmentlistComponent
     },
  {
    'path': 'planlist',
    'component': ShiplentplanComponent
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
    UploaderModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ListShipmentCommandModule,
    RouterModule

   ],
  // tslint:disable-next-line:max-line-length
  declarations: [ShiplentplanComponent, ShipmentlistComponent, CarryingStatuedPipePipe, CarryingTaskPipePipe, TglistComponent, XiecheComponent, CreateShipmentPlanComponent, XiechescanComponent, SignlistComponent, AddComponent, DetailComponent, NoselectedComponent, SignViewChangeDirective, DivFlexDirective],
  entryComponents: [CreateShipmentPlanComponent, AddComponent, DetailComponent, NoselectedComponent]
})
export class ShipmentModule { }
