import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {WidgetModule} from '../../component/widget';
import {SharedModule} from '../../shared/shared.module';
import {MessageModule} from '../../component/';
import {LogistictoreModule} from '../../buinesscomponent/logistore/logistictore.module';
import {BasedataModule} from '../../buinesscomponent/base/basedata.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';


const routes: Routes = [
  {
    'path': '',
    'component': HomeComponent
  }
];



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WidgetModule,
    MessageModule,
    RouterModule.forChild(routes),
    LogistictoreModule,
    BasedataModule,
    PerfectScrollbarModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
