import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {BasedataModule} from '../../../buinesscomponent/base/basedata.module';
import {LogistictoreModule} from '../../../buinesscomponent/logistore/logistictore.module';


const routes: Routes = [
  {
    'path': 'list',
    component: ListComponent
  },
  {
    'path': 'create',
    component: CreateComponent
  },
  {
    'path': 'detail/:id',
    component: DetailComponent
  }
];



@NgModule({
  declarations: [CreateComponent, DetailComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    BasedataModule,
    LogistictoreModule
  ]
})
export class LogisticstoreModule { }
