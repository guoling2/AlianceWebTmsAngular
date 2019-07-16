import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';
import {Formextension} from '../../../../help/formextension';
import {ShipmentSignatureService} from '../../../../services/logistic/shipment/shipment-signature.service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {EmitService} from '../../../../help/emit-service';
import {laneCollection} from '@syncfusion/ej2-diagrams/src/diagram/utility/swim-lane-util';
import {SignBaseView} from '../sign-base-view';

@Component({
  selector: 'app-sign-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, SignBaseView {
  constructor(private elementRef: ElementRef, private emitService: EmitService, private formBuilder: FormBuilder, private shipmentSignatureService: ShipmentSignatureService) {

  }

  public form: FormGroup;

  @Input()
  public OrderTrackServerId: string;
  @Input()
  public  OrderLogisticDetailId: string;

  @ViewChild('defaultupload', {static: false})
  public uploadObj: UploaderComponent;
  @ViewChild('Dialog', {static: false})
  public dialogObj: DialogComponent;
  public width = '335px';
  public visible = false;
  public multiple = false;
  public showCloseIcon: Boolean = true;
  public formHeader = 'Success';
  public content = 'Your details have been updated successfully, Thank you.';
  public target = '#control_wrapper';
  public isModal = true;
  public animationSettings: any = {
    effect: 'Zoom'
  };
  public formSumitAttempt: boolean;
  // public dlgBtnClick: EmitType<object> = () => {this.dialogObj.hide(); };
  public dlgButtons: Object[] = [{  buttonModel: { content: 'Ok', isPrimary: true } }];
  public uploadInput = '';
  public  SignTypeDataSource = ['本人签收', '网点签收'];
  selectfile: File;

  height: number;

  ViewType: string;
  public browseClick() {
    document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click(); return false;
  }
  public Submit(): void {
    this.onFormSubmit();
  }
  public onFileSelect: EmitType<Object> = (args: any) => {
    this.uploadInput = args.filesData[0].name;
    this.selectfile = args.filesData[0].rawFile;
    // const file = args.filesData[0];
   // this.form.get('OrderBackFile').setValue(file);
  }

  public onFormSubmit(): void {
    this.formSumitAttempt = true;
    if (this.form.valid) {

      this.form.get('OrderBackFile').setValue(this.selectfile);

      this.shipmentSignatureService.add(this.form.getRawValue()).subscribe((a) => {
        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
        if ( a.StatusCode !== TmsresponseStatusCode.Succeed() ) {
        } else {

          this.OrderTrackServerId = '';
          this.form.reset();

        }
       // this.form.get('OrderBackFile').setValue('');
        alert('上传成功');
      });

    } else {
      Formextension.validateAllFormFields(this.form);
    }
  }
  ngOnInit() {




    this.form = this.formBuilder.group({
      OrderLogisticDetailId: [this.OrderLogisticDetailId, [Validators.required]],
      SignUserName: [null, [Validators.required]],
      SingaMemberType: [null, [Validators.required]],
      SignDateTime: ['2019-6-13 12:30'],
      OrderBackFile: [null, Validators.required],
    });
  }

  isFieldValid(field: string) {
    return ((!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSumitAttempt));
  }

}
