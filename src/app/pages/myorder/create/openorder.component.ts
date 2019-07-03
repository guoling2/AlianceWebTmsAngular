import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormsControlServiceService} from '../../../services/forms-control-service.service';
import {ShipmentOrderService} from '../../../services/logistic/order/shipment-order.service';
import {FilteringEventArgs, SelectEventArgs} from '@syncfusion/ej2-angular-dropdowns';
import {BusAreaService} from '../../../services/base/bus-area.service';
import {BusAreaEntity} from '../../../models/base/busareaEntity';
import {HttpClient} from '@angular/common/http';
import {TihuoType} from '../../../modeldata/tihuotypedata';
import {YunshuxingzhiData} from '../../../modeldata/yunshuxingzhidata';
import {LogisticStoreServiceService} from '../../../services/logisticstore/logisticstoreservice';
import {LogisticStoreAuthorizeServiceService} from '../../../services/logisticstore/logistic-store-authorize-service.service';
import {LogisticStore} from '../../../models/LogisticStore/logistic-store';
import {Logistcistorefiled} from '../../../modeldata/logistcistorefiled';
import {CustomePaymentMethod} from '../../../modeldata/customePaymentMethod';
import {CargoReceiptPaperShowType} from '../../../modeldata/cargoReceiptPaperShowType';
import {EmitService} from '../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {Formextension} from '../../../help/formextension';
import {OpenOrdervalidationMessages} from '../openordervalidation';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {DialogservicesService} from '../../../help/dialogservices.service';
import { ProgressButton, SpinSettingsModel, AnimationSettingsModel } from '@syncfusion/ej2-angular-splitbuttons';
import {MatDialog} from '@angular/material';
import {CustomeraddressaddComponent} from '../../logisticcustomer/_sub/customeraddressadd/customeraddressadd.component';
import {OrdercustomerComponent} from '../_sub/ordercustomer/ordercustomer.component';
import {CustomerAddressModle} from '../../../models/customers/customer-address-modle';
import {CustomerQueryForOrdermodle} from '../../../models/customers/customer-for-order-query-modle';
import {CustomerTaxServiceService} from '../../../services/customers/customer-tax-service.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {CustomerProfileModle} from '../../../models/customers/customer-profile-modle';
import {CustomerTaxModle} from '../../../models/customers/customer-tax-modle';
import {map} from 'rxjs/operators';
import {OrderrouteplanComponent} from '../_sub/orderrouteplan/orderrouteplan.component';
@Component({
  selector: 'app-myopenorder',
  templateUrl: './openorder.component.html',
  styleUrls: ['./openorder.component.css']
})
export class OpenMyorderComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public emitService: EmitService,
    private http: HttpClient,
    private bsAreaService: BusAreaService,
    private fb: FormBuilder,
    private formsControlServiceService: FormsControlServiceService,
    private shipmentOrderService: ShipmentOrderService,
    private logisticStoreServiceService: LogisticStoreServiceService,
    private logisticStoreAuthorizeServiceService: LogisticStoreAuthorizeServiceService,
    private customerTaxServiceService: CustomerTaxServiceService,
    private  dialogx: DialogservicesService
  ) { }

  /**
   * 订单品相
   * return FormArray
   */
  public get OrderItems(): FormArray {
    return this.saveform.get('ShipmentOrderItems') as FormArray;
  }


  public CustomerTaxModles: CustomerTaxModle[] = []; // 用来存储发货客户开票数据
  public saveform: FormGroup;
  public shiporder: object;
  public toareadisplaystring: string = null;

  // maps the remote data column to fields property
  public remoteFields: Object = { value: 'AreaNameDesc' };

  public taxfields: Object = { text: 'Invoicetitle', value: 'Taxno' };

  public TihuoType: TihuoType = TihuoType;
  public YunshuxingzhiData: YunshuxingzhiData = YunshuxingzhiData;
  private openOrdervalidationMessages: object = OpenOrdervalidationMessages;

  public group: { [key: string]: Object }[] = [];

  public MyAuthonStores: LogisticStore[] = [];
  public ToSendStores: LogisticStore[] = [];
  public StoresFields: object = Logistcistorefiled.filed;


  public displyatotalfee = 0; // 用于显示费用合计

  issave: boolean; // 正在保存数据
  public slideRight: AnimationSettingsModel = { effect: 'SlideRight' };

  @ViewChild('savabtn ')
  SaveBtn: ProgressButton;


  enbelbackuprouteplan = false; // 是否启用备选线路计算


  ngOnInit() {


    console.log(CustomePaymentMethod.Data);
    this.logisticStoreServiceService.StoreQuery().subscribe((value: LogisticStore[]) => {

      console.log(value);
      this.ToSendStores = value;

    });
    this.logisticStoreAuthorizeServiceService.MyStores().subscribe(a => {

      this.MyAuthonStores = a;

    });
    this.http
      .get<BusAreaEntity[]>('assets/data/area.json')
      .subscribe((value: BusAreaEntity[]) => {
        value.forEach((a, index) => {
          this.group.push({ AreaID: a.AreaID, AreaNameDesc: a.AreaNameDesc });
        });
      });

    // @ts-ignore
    this.saveform = this.fb.group({
      CustomerOrderId: '',
      TrackOrderNumber: '',
      IfCargoFromOrigin: false, // 是否上门提货
      FreeTihuo: { value: false, disabled: true }, // 是否免费提货
      OrderItemCaclProperty: 'ZH',
      BuinessManCode: '',
      AskTihuoTime: '',
      BuinessMancommission: '', // { value: '', disabled: true }, // 佣金
      BuinessMancommissionIsReturn: { value: '', disabled: true }, // { value: false, disabled: true }, // 佣金已返

      OrigincustomId: '', // 客户编码
      Origincustomname: '',
      OrigincustomLinkman: ['', Validators.required],
      Origintel: ['', Validators.required],
      OriginCity: '',
      OriginArea: '',
      OriginAddress: '',

      DestcustomId: '', // 到货客户编码
      Destcustomname: '',
      DestcustomLinkman: ['', Validators.required],
      Desttel: ['', Validators.required],
      DestCity: '',
      DestArea: '',
      DestAddress: '',
      InnerMark: '',
      ShipmentOrderItems: new FormArray([]),

      Destservice: ['', Validators.required], // 交货方式，
      TransportMethod: '陆运', // 运输方式
      BeginLogisticStoreId: '', // 始发网点
      EndLogisticStoreId: { value: '', disabled: false }, // 末端配送网点
      OrderAskLimiteDateTime: '',
      TransportMark: '', // 运输备注
      // 增值业务
      DeclaredValue: '', // 声明货物价值
      CollectionOnDeliveryAmount: '', // 声明代收货款
      CollectionOnDeliveryBankPeopleName: '', // 代收货款人姓名
      CollectionOnDeliveryBankNumber: '', // 代收货款银行账号
      InvoiceTitle: {value: '', disabled: true}, // 发票抬头
      IsOpenInvoice: { value: 'false' }, // 是否开票
      // CargoReceiptNumber:'',//回单
      Needreturntrackingno: '', // 是否回单
      CargoReceiptPaperShowType: '', // 回单返回方式
      ConpunCode: '', // 优惠折扣代码
      PaymentMethod: ['', Validators.required], // 付款方式

      // 费用信息
      TihuoFee: '0', // 提货费
      BaseTransportFee: '0', // 基本运费
      SonhuoFee: '0', // 送货费
      AddValueFee: '0', // 增值费用
      ExtendOtherFee: '0', // 额外费用
      RealInputLogisticFee: '0' // 实际费用
    });
    // form = new FormGroup({
    //   first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    //   last: new FormControl('Drew', Validators.required)
    // });

    // 模拟添加品相的方式
    this.AddItem();

    this.subscibrefeechange(); // 金额变化~~

    this.subscibretihuocontrolstatued(); // 是否提货费用的关注

    this.subscibredestservicechange(); // 交货方式改变;
    // this.data=bsAreaService
  }

  private AddItem() {
    this.OrderItems.push(
      this.fb.group({
        Package: ['', Validators.required],
        PackingType: '',
        PackageCount: 0,
        PackageVolM: '0',
        PackageWeightKg: '0',
        PackageLength: '',
        PackageWidth: '',
        PackageHigh: ''
      })
    );
  }
  /**
   * 订阅交货改变
   */
  private subscibredestservicechange(): void {
    this.saveform.get('Destservice').valueChanges.subscribe(($event: string) => {

      switch ($event) {

        case TihuoType.TihuoForganxian30:
        case TihuoType.TihuoForganxian50:  // 根据逻辑判断是否启用备用线路按钮

          this.enbelbackuprouteplan = true;
          break;
        default:
          this.enbelbackuprouteplan = false;
          break;
      }

     console.log($event);
    });

}

  /**
   * 订阅费用变化
    */
  private subscibrefeechange(): void {

    const InputValueChange = ($event) => {

      this.displyatotalfee = Number(this.saveform.get('TihuoFee').value)
        + Number(this.saveform.get('BaseTransportFee').value)
        + Number(this.saveform.get('SonhuoFee').value)
        + Number(this.saveform.get('AddValueFee').value)
        + Number(this.saveform.get('ExtendOtherFee').value);

      this.saveform.patchValue({ RealInputLogisticFee: this.displyatotalfee });
    };

    this.saveform.get('TihuoFee').valueChanges.subscribe(InputValueChange);
    this.saveform.get('BaseTransportFee').valueChanges.subscribe(InputValueChange);
    this.saveform.get('SonhuoFee').valueChanges.subscribe(InputValueChange);
    this.saveform.get('AddValueFee').valueChanges.subscribe(InputValueChange);
    this.saveform.get('ExtendOtherFee').valueChanges.subscribe(InputValueChange);

  }

  /**
   *提货状态的改变
   */
  private subscibretihuocontrolstatued(): void {

    // this.saveform.get('IfCargoFromOrigin').valueChanges.subscribe(($event) => {
    //
    //   if ($event === true) {
    //     // this.saveform.get('TihuoFee').enable();
    //     this.saveform.get('FreeTihuo').enable();
    //
    //   } else {
    //     // this.saveform.get('TihuoFee').setValue('0');
    //     // this.saveform.get('TihuoFee').disable();
    //     this.saveform.get('FreeTihuo').disable();
    //   }
    // });

    this.saveform.get('FreeTihuo').valueChanges.subscribe(($event) => {

      if ($event === true) {
        this.saveform.get('TihuoFee').enable();
        this.saveform.get('FreeTihuo').enable();

      } else {
        this.saveform.get('TihuoFee').setValue('0');
        this.saveform.get('TihuoFee').disable();
        this.saveform.get('FreeTihuo').disable();
      }
    });
  }
  SaveOrder() {
    if (this.issave === true) {

      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '系统正在保存数据', MessageShowType.Toast));
      return;
    }
    if (this.saveform.valid === false) {
      Formextension.getFormValidationErrorsAndEmit(this.saveform, this.openOrdervalidationMessages, this.emitService);
      return;
    }

    // alert(this.saveform.get('CargoReceiptPaperShowType').value.toString().length);

    // return;
    if (this.saveform.get('CargoReceiptPaperShowType').value.toString().length !== 0) {
      this.saveform.patchValue({ Needreturntrackingno: true });
    } else {
      this.saveform.patchValue({ Needreturntrackingno: false });
    }
    this.issave = true;
    const alerter = {
      Title: '确认',
      Message: '是否开单',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }
        try {
          this.shipmentOrderService.CreateShipmentMyOrder(JSON.stringify(this.saveform.value)).subscribe(a => {
            this.emitService.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
            if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {
              this.saveform.reset();
              // this.additem();
            }

            console.log(a);
          });
        } finally {
          this.issave = false;
        }

      })};
    this.dialogx.openDialog(alerter);
  }

  /**
   * 选择完之后
   */
  displayarea(number: number, $event: SelectEventArgs) {
    console.log($event.item);
    console.log($event.itemData);
    // @ts-ignore
    this.saveform.setValue('2');
    alert(number);
  }

  filteringarea($event: FilteringEventArgs) {
    if ($event.text.length > 1) {
      this.bsAreaService.SearchArea($event.text).subscribe(a => {
        const group: any = {};

        a.forEach(question => {
          group[question.AreaNameDesc] = question;
        });

        console.log(group);
        // this.originauto.addItem(group);
      });
    }
  }
  ResetForm() {
    this.saveform.reset();
  }
  additem() {
    this.AddItem();
  }

  // 选择客户  1 发货 2收货
  choecustomer(number: number, height: string, width: string) {

    const dialogRef = this.dialog.open(OrdercustomerComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: number
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == null) {
        return;
      }
       const customertype = <number>result[0];
       const selectcustomer = <CustomerQueryForOrdermodle>result[1];

      if (customertype === 1) {
        this.saveform.patchValue({ OrigincustomId: selectcustomer.CustomerId });
        this.saveform.patchValue({ Origincustomname: selectcustomer.Name });
        this.saveform.patchValue({ OrigincustomLinkman: selectcustomer.LinkMan });
        this.saveform.patchValue({ Origintel: selectcustomer.LinkTel });
        this.saveform.patchValue({ OriginArea: selectcustomer.Area });
        this.saveform.patchValue({ OriginAddress: selectcustomer.LinkAddress });

        if (selectcustomer.Ismonth) {
          this.saveform.patchValue({PaymentMethod: CustomePaymentMethod.PaymentMehodDataForMonth});
        }

      } else {
        this.saveform.patchValue({ DestcustomId: selectcustomer.CustomerId });
        this.saveform.patchValue({ Destcustomname: selectcustomer.Name });
        this.saveform.patchValue({ DestcustomLinkman: selectcustomer.LinkMan });
        this.saveform.patchValue({ Desttel: selectcustomer.LinkTel });
        this.saveform.patchValue({ DestArea: selectcustomer.Area });
        this.saveform.patchValue({ DestAddress: selectcustomer.LinkAddress });
      }

     // this.CustomerTaxModles = this.customerTaxServiceService.Search(selectcustomer.CustomerId);


      const x = this.CustomerTaxModles;
      this.customerTaxServiceService.Search(selectcustomer.CustomerId).subscribe((a) => {
        if (a.length > 0) {

          if (x.length > 0) {

            x.forEach((c, index) => {

              if (c.SelectType === customertype.toString()) {

                x.splice(index, 1);
              }

            });
          }

          this.CustomerTaxModles = [];
          a.forEach((item, index) => {
            item.SelectType = customertype.toString();
            this.CustomerTaxModles.push(item);
          });
            this.CustomerTaxModles = this.CustomerTaxModles.concat(x);
        }

      });

    });
  }

  // 选择开票的事件
  IsOpenInvoiceChange($event: boolean) {

    if ($event) {
      this.saveform.get('InvoiceTitle').enable();
    } else {
      this.saveform.get('InvoiceTitle').patchValue('');
      this.saveform.get('InvoiceTitle').disable();
    }

    console.log($event);
  }

  caclorderroute(height: string, width: string) {

   const s1 = this.saveform.get('BeginLogisticStoreId').value;
   const s2 = this.saveform.get('EndLogisticStoreId').value;

   if (s1 == null || s2 == null) {
     this.emitService.eventEmit.emit(
       new EmitAlertMessage(AlertMessageType.Error, '系统信息', '网点参数错误！', MessageShowType.Toast));
     return;
   }

    const dialogRef = this.dialog.open(OrderrouteplanComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: new Array<string>(s1, s2)
    });

    dialogRef.afterClosed().subscribe(result => {

    });


  }
}
