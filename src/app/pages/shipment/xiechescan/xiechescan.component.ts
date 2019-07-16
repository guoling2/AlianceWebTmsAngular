import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogservicesService } from '../../../help/dialogservices.service';
import { EmitService } from '../../../help/emit-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogisticstoreService } from '../../../services/base/logisticstore.service';
import { XiecheService } from '../../../services/logistic/shipment/xieche.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import {XieCheScanResponseModel} from './XieCheScanResponseModel';
import {AlertMessageType, EmitAlertMessage} from '../../../help/emit-alert-message';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {dataBinding} from '@syncfusion/ej2-schedule';
import { EditService, PageService, CommandColumnService, CommandModel } from '@syncfusion/ej2-angular-grids';
import {Commonsetting} from '../../../help/commonsetting';
import {CheckBoxComponent} from '@syncfusion/ej2-angular-buttons';
@Component({
  selector: 'app-xiechescan',
  templateUrl: './xiechescan.component.html',
  styleUrls: ['./xiechescan.component.css'],
  providers: [ EditService, PageService, CommandColumnService]
})
export class XiechescanComponent implements OnInit {
  constructor(public emitService: EmitService, private fb: FormBuilder, private xiecheService: XiecheService) { }

  saveform: FormGroup;

  @ViewChild('singelsearch', {static: false})
  SearchCodeText: TextBoxComponent;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  public XieCheScanResponses = new Array<XieCheScanResponseModel>();
  XieCheScanResponses2: { [key: string]: XieCheScanResponseModel }[] = [];
  public  MultilineInpuntValue: string;
  public commands: CommandModel[];
  public editSettings: Object;
  public  multilinehidden = true;

  @ViewChild('sannmodel', {static: false})
  public checkbox: CheckBoxComponent;

  ngOnInit() {
    // const x=new XieCheScanResponseModel();
    // x.XieCheId="1";
    // x.PlanStatuedId=1;
    // x.XieCheCode="2";
    // x.OrderCount=1;
    // x.ProcessMsg="正在处理";
    // this.XieCheScanResponses.push(x);
    this.saveform = this.fb.group({
      ActionStoreId: '',
      SearchValue: ''
    });
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: false };
    this.commands = [
      { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } }];
  }

  searching(input: string) {

    this.xiecheService.Scan(input, this.saveform.get('ActionStoreId').value).subscribe((a) => {
      const  requestdatas = a.Data as XieCheScanResponseModel[];
      if (requestdatas == null || requestdatas.length === 0) {
        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Error, '系统信息', '没有数据' + input));
        return;
      }
      for (let i = 0; i < requestdatas.length; i++) {
       if (requestdatas[i].PlanStatuedId !== 20 ) {
         this.emitService.eventEmit.emit(
           new EmitAlertMessage(AlertMessageType.Error, '系统信息', '物流单号：' + requestdatas[i].XieCheCode + '卸车状态不正确！'));
         continue;
       }
       const  result = this.XieCheScanResponses.find((search) => search.XieCheId === requestdatas[i].XieCheId);
       if ( result === undefined ) {
         this.XieCheScanResponses.push(requestdatas[i]);
         this.grid.refresh();
       }
      }
    });

  }

  confirmxieche() {
   if ( this.XieCheScanResponses.length === 0 ) {
     return;
   }
    for (let i = 0; i < this.XieCheScanResponses.length; i++) {
      const save = this.XieCheScanResponses[i];
      save.ProcessMsg = '正在处理';
      this.grid.refresh();
      this.xiecheService.XieChe( {
        XieCheId: save.XieCheId,
        ActionStoreId: save.ActionStoreId,
        RealOrderCount: save.OrderCount

      }).subscribe((a) => {
        const  result = this.XieCheScanResponses.find((search) => search.XieCheId === a.Data.toString());
        if ( result != null ) {
          result.ProcessMsg = a.Info;
          this.grid.refresh();
        }
      });
    }

  }

  singelseatch($event: KeyboardEvent) {

    // alert(this.saveform.get("ActionStoreId").value);
    if ($event.key === 'Enter') {
      this.searching(this.saveform.get('SearchValue').value);
      this.saveform.get('SearchValue').setValue('');
      this.SearchCodeText.dataBind();
     // this.SearchCodeText.refresh();
      // this.SearchCodeText.focus();
    }
  }

  Searchmultilie () {

    if (this.MultilineInpuntValue.length !== 0) {
      const inputvalues = this.MultilineInpuntValue.split('\n');
      for (let i = 0; i < inputvalues.length; i++) {
        this.searching(inputvalues[i]);
      }

    }
  }

  /**
   * 清除表格
   */
  clearrecords () {

   this.XieCheScanResponses = new Array<XieCheScanResponseModel>();
  }
  changeHandler () {
    if ( this.checkbox.checked) {
      this.checkbox.label = '当前为单行扫描，点击选择多行扫描';
    } else {
      this.checkbox.label = '当前为多行扫描，点击选择单行扫描';
    }
    this.multilinehidden = this.checkbox.checked;
  }
}
