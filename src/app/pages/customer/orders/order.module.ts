import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../../common/commonbizmodule.module';
import {CustomerOrderDetailComponent} from '../orders/order/detail.component';


const routes: Routes = [
  {
    path: '',
    data: {title: '客户订单'},
    children: [
      {
        path: 'detail/:id',
        component: CustomerOrderDetailComponent
      }]
  }
];



@NgModule({
  declarations: [CustomerOrderDetailComponent],
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
  ]
})
export class CustomerOrderModule { }
