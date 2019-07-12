import {Component, Inject, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {CustomerAddressServiceService} from '../../../../services/customers/customer-address-service.service';
import {EmitService} from '../../../../help/emit-service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TrackRoueCaclResultModel} from '../../../../models/TrackRoueCacl/track-roue-cacl-result-model';
import {OrderRoutePlanService} from '../../../../services/Math/order-route-plan-service';

@Component({
  selector: 'app-orderrouteplan',
  templateUrl: './orderrouteplan.component.html',
  styleUrls: ['./orderrouteplan.component.css']
})
export class OrderrouteplanComponent implements OnInit {


  public  selectPlanId = '0';

  trackRoueCaclResultx: TrackRoueCaclResultModel[];

  constructor(private oidcSecurityService: OidcSecurityService,
              private orderRoutePlanService: OrderRoutePlanService,
              private emitService: EmitService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<OrderrouteplanComponent>,
              @Inject(MAT_DIALOG_DATA) public routeIds: Array<string>) { }

  ngOnInit() {


    this.selectPlanId = this.routeIds[2];

    // alert(this.selectPlanId );
    this.orderRoutePlanService.Cacl(this.routeIds[0], this.routeIds[1]).subscribe((a) => {

      this.trackRoueCaclResultx = a;

    });
  }

  ChosePlan(planId: string) {

    const plan = this.trackRoueCaclResultx.find(t => t.PlanId === planId);

    let plandesc = '';

    plan.TransPoints.forEach((tp, inddex) => {
       plandesc += tp.PointName;

       if (inddex !== plan.TransPoints.length - 1) {
         plandesc += '-';
       }

     });

    this.dialogRef.close([planId, plandesc]);
  }
}
