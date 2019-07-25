import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {StorePriceAnalysisService} from '../../../../../services/Math/store-price-analysis.service';
import {OrderRoutePlanService} from '../../../../../services/Math/order-route-plan-service';
import {Priceanalysisparameter} from '../../../../myorder/priceanalysisparameter';

@Component({
  selector: 'app-selectdriver',
  templateUrl: './selectdriver.component.html',
  styleUrls: ['./selectdriver.component.css']
})
export class SelectdriverComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<SelectdriverComponent>,
               @Inject(MAT_DIALOG_DATA) public parameter: string) { }

  ngOnInit() {
  }

}
