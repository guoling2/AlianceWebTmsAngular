import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { LogisticModule } from './logistic/logistic.module';
import {OrderflowmessagComponent} from '../common/orderflow/orderflowmessag.component';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';



const routes: Routes = [
  {
    path: 'logistic',
    loadChildren: './logistic/logistic.module#LogisticModule'
  },
  {
    path: 'orders',
    loadChildren: './orders/order.module#CustomerOrderModule'
  }
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LogisticModule,
    CommonbizmoduleModule,
    RouterModule.forChild(routes)

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule
   ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
})
export class CustomerModuleModule { }
