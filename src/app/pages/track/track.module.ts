import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { RoutelistComponent } from './route/routelist.component';
import {OrderMapComponent} from './ordermap/order-map.component';
import {OrderflowmessagComponent} from '../common/orderflow/orderflowmessag.component';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import { BadorderDetailComponent } from './badorderdetail/badorder-detail.component';
import { ProcessdashbordComponent } from './badorderprocess/processdashbord.component';
import { TaskdateilComponent } from './badorderprocess/taskdateil/taskdateil.component';
import {XbadorderDetailComponent} from './command/xbaddetail/xbadorder-detail.component';
import { OrderAbnormalProcessComponent } from './badorderprocess/taskdateil/component/order-abnormal-process/order-abnormal-process.component';
import { OrderAbnormalPaymentComponent } from './badorderprocess/taskdateil/component/order-abnormal-payment/order-abnormal-payment.component';
import {MulipageReuseStrategy} from '../../mulipage-reuse-strategy';
import { OrderAbnormalProcessResultComponent } from './badorderprocess/taskdateil/component/order-abnormal-process-result/order-abnormal-process-result.component';
import { OrderAbnormalFileComponent } from './badorderprocess/taskdateil/component/order-abnormal-file/order-abnormal-file.component';
import {NewBackorderComponent} from './newbadorderlist/newbadorder.component';
import { BadorderlistComponent } from './badorderlist/badorderlist.component';


const routes: Routes = [

  {
    'path': 'ordermap',
    'component': OrderMapComponent
  },
  {
    'path': 'newbadorderlist',
    'component': NewBackorderComponent
  },
  {
    'path': 'badorderlist',
    'component': BadorderlistComponent
  },
  {
    'path': 'badorderprocess',
    'component': ProcessdashbordComponent,
    'children': [
      {path: ':id', component: TaskdateilComponent, outlet: 'ptd', pathMatch: 'full'}
    ]
  },
  {
    'path': 'badorderdetail/:id',
    'component': BadorderDetailComponent,
    data: {
      title: '异常件明细',
      isRemove: true
    }
  },
  {
       path: 'route',
       children: [{
       path: 'list',
       component: RoutelistComponent
    }]
  }
];



@NgModule({
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
  declarations: [XbadorderDetailComponent, RoutelistComponent, OrderMapComponent,
    BadorderDetailComponent, ProcessdashbordComponent, TaskdateilComponent,
    OrderAbnormalProcessComponent, NewBackorderComponent , OrderAbnormalPaymentComponent, OrderAbnormalProcessResultComponent, OrderAbnormalFileComponent, BadorderlistComponent],

  entryComponents: [OrderflowmessagComponent]
})
export class TrackModule { }
