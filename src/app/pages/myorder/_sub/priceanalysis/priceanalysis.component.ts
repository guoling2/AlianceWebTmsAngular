import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Priceanalysisparameter} from '../../priceanalysisparameter';
import {OrderrouteplanComponent} from '../orderrouteplan/orderrouteplan.component';
import {BusAreaEntity} from '../../../../models/base/busareaEntity';
import {HttpClient} from '@angular/common/http';
import {StoreCaclRequestModel} from '../../../../models/priceAnalysis/store-cacl-request-model';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {EmitService} from '../../../../help/emit-service';
import {OrderRoutePlanService} from '../../../../services/Math/order-route-plan-service';
import {TrackRoueCaclResultModel} from '../../../../models/TrackRoueCacl/track-roue-cacl-result-model';
import {StorePriceAnalysisService} from '../../../../services/Math/store-price-analysis.service';

@Component({
  selector: 'app-priceanalysis',
  templateUrl: './priceanalysis.component.html',
  styleUrls: ['./priceanalysis.component.css']
})
export class PriceanalysisComponent implements OnInit {

  saveform: FormGroup;

  areagroup: { [key: string]: Object }[] = [];

  arearemoteFields: Object = {text: 'AreaNameDesc', value: 'AreaNameDesc' };

  displayedColumns: string[] = ['SequenceId', 'StoreId', 'Storename', 'local_pickup_amt', 'load_amt', 'delivery', ];

  AnalysisResultPrice: number;

  AnalysisResultList: any;

  trackRoueCaclResult: TrackRoueCaclResultModel;

  enabelsearchbtn = true;
  constructor(
              public emitService: EmitService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<PriceanalysisComponent>,
              private http: HttpClient,
              private storePriceServiceService: StorePriceAnalysisService,
              private orderRoutePlanService: OrderRoutePlanService,
              @Inject(MAT_DIALOG_DATA) public parameter: Priceanalysisparameter ) { }

  ngOnInit() {

    this.saveform = this.fb.group({
      BeginStoreId: '',
      EndStoreId: '',
      BeginTihuoAreaCode: '',
      EndAreaCode: '',
      IfCargoFromOrigin: true,
      IfCargoReturnWarehouse: true,
      IfDesctPickUpMySelf: false,
      TotalCount: 1,
      TotalVol: 0.01,
      TotalWeight: 0.01,
    });
    this.http
      .get<BusAreaEntity[]>('assets/data/area.json')
      .subscribe((value: BusAreaEntity[]) => {
        value.forEach((a, index) => {
          this.areagroup.push({ AreaID: a.AreaID, AreaNameDesc: a.AreaNameDesc });
        });
      });
  }

  openchoseroute() {

    let s1 = <string>this.saveform.get('BeginStoreId').value;
    let s2 = <string> this.saveform.get('EndStoreId').value;

    if (s1 == null) {
      s1 = '';
    }
    if (s2 == null) {
      s2 = '';
    }

    if (s1.length === 0 || s2.length === 0) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '网点参数错误！', MessageShowType.Toast));
      return;
    }

    const dialogRef = this.dialog.open(OrderrouteplanComponent, {
      height: '500em',
      width:  '500em',
      disableClose: false,
      data: new Array<string>(s1, s2)
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result[0] != null) {
        this.enabelsearchbtn = false;
        this.orderRoutePlanService.FindPlan(s1, s2, result[0]).subscribe((a) => {
          this.trackRoueCaclResult = a;
          this.enabelsearchbtn = true;
        });
      }

    });
  }

  analysis() {


    const caclmodel = <StoreCaclRequestModel>this.saveform.getRawValue();

    const x =  this.areagroup.find(t => t.AreaNameDesc === caclmodel.BeginTihuoAreaCode);

    const y =  this.areagroup.find(t => t.AreaNameDesc === caclmodel.EndAreaCode);

    if (x != null) {
      caclmodel.BeginTihuoAreaCode = x.AreaID.toString();
    }
   if (y != null) {
     caclmodel.EndAreaCode = y.AreaID.toString();
   }

    if (this.trackRoueCaclResult != null) {
      if (this.trackRoueCaclResult.TransPoints.length > 2) {

        caclmodel.LoopStoreIds = [];

        for (let i = 1; i < this.trackRoueCaclResult.TransPoints.length - 1; i++) {

          const routepoint =  this.trackRoueCaclResult.TransPoints[i];

          caclmodel.LoopStoreIds.push(routepoint.PointId);
        }
      }
    }
   console.log(caclmodel);

    this.storePriceServiceService.Analysis(caclmodel).subscribe((a) => {

      if (a.StatusCode !== TmsresponseStatusCode.Succeed()) {

        this.AnalysisResultList = [];
        this.AnalysisResultPrice = 0;

        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Error, '系统信息', a.Info, MessageShowType.Toast));
      } else {
        this.AnalysisResultList = a.Data['AnalysisResult'];
        this.AnalysisResultPrice = a.Data['TotalPrice'];
      }

    });
  }

}
