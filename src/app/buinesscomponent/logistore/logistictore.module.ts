import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MylogisticstoreComponent } from './mylogisticstore/mylogisticstore.component';
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogisticstoreallComponent } from './logisticstoreall/logisticstoreall.component';
import { StoreleaveComponent } from './storeleave/storeleave.component';
import { StoretypeComponent } from './storetype/storetype.component';
import { Mylogistiscstore2Component } from './mylogisticstore/sub/mylogistiscstore2/mylogistiscstore2.component';

@NgModule({
  declarations: [MylogisticstoreComponent, LogisticstoreallComponent, StoreleaveComponent, StoretypeComponent, Mylogistiscstore2Component],
  exports: [MylogisticstoreComponent, LogisticstoreallComponent, StoreleaveComponent, StoretypeComponent, Mylogistiscstore2Component],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LogistictoreModule { }
