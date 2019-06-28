import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { ToolbarHelpComponent } from './toolbar-help/toolbar-help.component';
import { ToolbarNotificationComponent } from './toolbar-notification/toolbar-notification.component';
import {HeadComponent} from './head.component';
import {SharedModule} from '../../shared/shared.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [

    SharedModule,
    HttpClientModule,
    RouterModule,
    PerfectScrollbarModule
  ],
  declarations: [
    HeadComponent,
    ToolbarUserComponent,
    ToolbarHelpComponent,
    ToolbarNotificationComponent
  ],
  providers: [

    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [
    HeadComponent
  ]
})
export class HeaderModule {
}
