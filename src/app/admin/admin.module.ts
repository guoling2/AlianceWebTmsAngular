import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AdminComponent } from './admin.component';

import {HeaderModule} from './head/header.module';
import {SharedModule} from '../shared/shared.module';
import {FooterComponent} from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import {BrandComponent} from './brand/brand.component';
import {NavigationModule} from './navigation/navigation.module';
import {MessageModule} from '../component/message';
import { AlertComponent } from './shared/alert.component';


@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    MessageModule,
    HeaderModule,
    NavigationModule
  ],
  declarations: [
    AdminComponent,
    BrandComponent,
    FooterComponent,
    AlertComponent
  ],
  providers: [],
  exports: []
})
export class AdminModule {
}
