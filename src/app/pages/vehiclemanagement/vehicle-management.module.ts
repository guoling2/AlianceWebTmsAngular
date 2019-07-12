import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerModelComponent } from './container-model/container-model.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';






const routes: Routes = [

  {
    path: 'containers',
    component: ContainerModelComponent
  }
];
@NgModule({
  declarations: [ContainerModelComponent],
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
})
export class VehicleManagementModule { }
