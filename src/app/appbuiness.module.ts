import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogistictoreModule} from './buinesscomponent/logistore/logistictore.module';
import {SharedModule} from './shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BasedataModule} from './buinesscomponent/base/basedata.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LogistictoreModule,
    BasedataModule
  ]
})
export class AppbuinessModule { }
