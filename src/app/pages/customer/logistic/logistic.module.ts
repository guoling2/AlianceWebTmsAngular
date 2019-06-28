import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackBindComponent } from './bindorder/track-bind.component';
import {RouterModule, Routes} from '@angular/router';
import {TrackNumberManagerComponent} from '../../base/tracknumber/track-number-manager.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OrderlistComponent } from './ordersearch/orderlist.component';
import {OrderflowmessagComponent} from '../../common/orderflow/orderflowmessag.component';
import {CommonbizmoduleModule} from '../../common/commonbizmodule.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CustomerOrderDetailComponent} from '../orders/order/detail.component';


const routes: Routes = [
  {
    path: 'bindorder',
    component: TrackBindComponent,
    data: {title: '订单配载'}
  },
  {
    path: 'ordersearch',
    component: OrderlistComponent,
    data: {title: '运单查询'}
  }
];



@NgModule({
  declarations: [TrackBindComponent, OrderlistComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonbizmoduleModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],

  entryComponents: [OrderflowmessagComponent]
})
export class LogisticModule { }
