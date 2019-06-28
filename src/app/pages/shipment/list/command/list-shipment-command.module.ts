import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../../../../shared/shared.module';
import {MatNativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {DelegateorderComponent} from './delegateorder/delegateorder.component';


@NgModule({
  imports: [CommonModule, FormsModule, SharedModule ,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule],
  declarations: [DelegateorderComponent],
  exports: [DelegateorderComponent]
})
export class ListShipmentCommandModule { }
