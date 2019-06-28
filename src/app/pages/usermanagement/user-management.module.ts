import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from './userlist/userlist.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserbaseinfoComponent } from './userdetail/component/userbaseinfo/userbaseinfo.component';
import { UserinstoreComponent } from './userdetail/component/userinstore/userinstore.component';


const routes: Routes = [

  {
    path: 'users',
    component: UserlistComponent
  },
  {
    path: 'users/edit/:id',
    component: UserdetailComponent
  }
];
@NgModule({
  declarations: [UserlistComponent, UserdetailComponent, UserbaseinfoComponent, UserinstoreComponent],
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
export class UserManagementModule { }
