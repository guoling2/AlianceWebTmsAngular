import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodelistComponent } from './nodelist/nodelist.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



const routes: Routes = [
  {
    'path': 'list',
    component: NodelistComponent
  }
];



@NgModule({
  declarations: [NodelistComponent],
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
})
export class LogisticRouteModule { }
