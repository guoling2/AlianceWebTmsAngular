import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupfeeblanceComponent } from './groupfeeblance/groupfeeblance.component';
import {SyncfusionModule} from '../../shared/syncfusion.module';



@NgModule({
  declarations: [GroupfeeblanceComponent],
  exports: [
    GroupfeeblanceComponent
  ],
  imports: [
    CommonModule,
    SyncfusionModule
  ]
})
export class ShipplangroupModule { }
