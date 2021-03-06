import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyOrderListComponent} from './list/list.component';
import {OpenMyorderComponent} from './create/openorder.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from '@syncfusion/ej2-angular-dropdowns';
import {LogistictoreModule} from '../../buinesscomponent/logistore/logistictore.module';
import {BasedataModule} from '../../buinesscomponent/base/basedata.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { OrdercustomerComponent } from './_sub/ordercustomer/ordercustomer.component';
import {CustomeraddressaddComponent} from '../logisticcustomer/_sub/customeraddressadd/customeraddressadd.component';
import {CustomertaxaddComponent} from '../logisticcustomer/_sub/customertaxadd/customertaxadd.component';
import { OrderrouteplanComponent } from './_sub/orderrouteplan/orderrouteplan.component';
import { PriceanalysisComponent } from './_sub/priceanalysis/priceanalysis.component';

const routes: Routes = [
  {
    'path': 'list',
    component: MyOrderListComponent
  },
  {
    'path': 'create',
    component: OpenMyorderComponent
  }
];

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    LogistictoreModule,
    BasedataModule

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [MyOrderListComponent, OpenMyorderComponent, OrdercustomerComponent, OrderrouteplanComponent, PriceanalysisComponent],
  entryComponents: [OrdercustomerComponent, OrderrouteplanComponent, PriceanalysisComponent]
})
export class LogistcimyorderModule { }
