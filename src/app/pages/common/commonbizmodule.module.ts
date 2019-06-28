import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { OrderflowmessagComponent } from './orderflow/orderflowmessag.component';


const routes: Routes = [


  {
    path: 'ordertrack/:trackorderid',
    component: OrderflowmessagComponent,
    data: {title: '物流追踪'}
  }
];



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [DriverComponent, OrderflowmessagComponent],
})
export class CommonbizmoduleModule { }
