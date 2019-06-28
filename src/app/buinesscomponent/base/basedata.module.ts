import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { CustomerpaymethodComponent } from './customerpaymethod/customerpaymethod.component';
import { CargoReceiptPaperShowTypeComponent } from './cargo-receipt-paper-show-type/cargo-receipt-paper-show-type.component';
import { TihuoTypeComponent } from './tihuo-type/tihuo-type.component';
import { YunshuxingzhiComponent } from './yunshuxingzhi/yunshuxingzhi.component';
import { WuliuorderstatuedComponent } from './wuliuorderstatued/wuliuorderstatued.component';
import { AreacascadingComponent } from './areacascading/areacascading.component';

@NgModule({
  declarations: [CustomerpaymethodComponent, CargoReceiptPaperShowTypeComponent, TihuoTypeComponent, YunshuxingzhiComponent, WuliuorderstatuedComponent, AreacascadingComponent],
  exports: [CustomerpaymethodComponent, CargoReceiptPaperShowTypeComponent, TihuoTypeComponent, TihuoTypeComponent, YunshuxingzhiComponent, AreacascadingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BasedataModule { }
