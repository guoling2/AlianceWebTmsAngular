import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { CustomercreateComponent } from './customercreate/customercreate.component';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import {RouterModule, Routes} from '@angular/router';
import {LogistictoreModule} from '../../buinesscomponent/logistore/logistictore.module';
import { CustomerbaseComponent } from './_sub/customerbase/customerbase.component';
import { CustomeraddresslistComponent } from './_sub/customeraddresslist/customeraddresslist.component';
import { CustomeraddressaddComponent } from './_sub/customeraddressadd/customeraddressadd.component';
import {BasedataModule} from '../../buinesscomponent/base/basedata.module';
import {CreateShipmentPlanComponent} from '../shipment/command/createshipmentplan/createshipmentplan.component';
import {AddComponent} from '../shipment/signlist/add/add.component';
import {DetailComponent} from '../shipment/signlist/detail/detail.component';
import {NoselectedComponent} from '../shipment/signlist/noselected/noselected.component';
import { CustomertaxComponent } from './_sub/customertax/customertax.component';
import { CustomertaxaddComponent } from './_sub/customertaxadd/customertaxadd.component';
import { DisplaytaxtypePipe } from './displaytaxtype.pipe';



const routes: Routes = [

  {
    path: 'customers',
    component: CustomerlistComponent
  },
  {
    path: 'edit/:id',
    component: CustomerdetailComponent
  },
  {
    path: 'create',
    component: CustomercreateComponent
  }
];


@NgModule({
  declarations: [CustomerlistComponent, CustomercreateComponent, CustomerdetailComponent, CustomerbaseComponent, CustomeraddresslistComponent, CustomeraddressaddComponent, CustomertaxComponent, CustomertaxaddComponent, DisplaytaxtypePipe],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonbizmoduleModule,
    LogistictoreModule,
    BasedataModule,
    RouterModule.forChild(routes)

  ],
  exports: [
  FormsModule,
  ReactiveFormsModule,
  RouterModule
  ],
  entryComponents: [CustomeraddressaddComponent, CustomertaxaddComponent]
})
export class CustomerManagementModule { }
