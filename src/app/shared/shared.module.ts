import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from './material.module';
import {SyncfusionModule} from './syncfusion.module';
import {DailogAlertModule, DialogAlertComponent} from '../component/';
import {FontawesomemoduleModule} from './extensions/fontawesomemodule.module';
import {FileerrordisplayModule} from '../component/tms/FieldErrorDisplay';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    SyncfusionModule,
    DailogAlertModule,
    FileerrordisplayModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    SyncfusionModule,
    DailogAlertModule,
    FileerrordisplayModule
  ],
  entryComponents: [DialogAlertComponent],
})
export class SharedModule {
}
