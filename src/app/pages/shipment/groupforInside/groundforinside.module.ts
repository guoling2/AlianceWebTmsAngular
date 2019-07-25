import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InsidePlanGroupCreateComponent} from './create/create.component';
import {HeaditemComponent} from './create/sub/headitem/headitem.component';
import {LogisticitemsComponent} from './create/sub/logisticitems/logisticitems.component';
import {SelectorderComponent} from './sub/selectorder/selectorder.component';
import {SelectvehicelComponent} from './sub/selectvehicel/selectvehicel.component';
import {SelectdriverComponent} from './sub/selectdriver/selectdriver.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShipplangroupModule} from '../../../buinesscomponent/shipplangroup/shipplangroup.module';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ShipplangroupModule
  ],
  declarations: [SelectdriverComponent, SelectorderComponent, SelectvehicelComponent, InsidePlanGroupCreateComponent, HeaditemComponent, LogisticitemsComponent, LogisticitemsComponent],
  entryComponents: [SelectdriverComponent, SelectorderComponent, SelectvehicelComponent]
})
export class GroundforinsideModule { }
