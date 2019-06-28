/**
 * @license
 * Copyright Stbui All Rights Reserved.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { DialogAlertComponent } from './dialog-alert.component';
import {MaterialComponentsModule} from '../../../shared/material.module';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialComponentsModule],
  declarations: [DialogAlertComponent],
  exports: [DialogAlertComponent]
})
export class DailogAlertModule {}
