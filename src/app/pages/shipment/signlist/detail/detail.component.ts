import {Component, Input, OnInit} from '@angular/core';
import {ShipmentSignatureService} from '../../../../services/logistic/shipment/shipment-signature.service';
import {ShipSignDetailModel} from '../../../../models/shipment/ship-sign-detail-model';
import {SignBaseView} from '../sign-base-view';

@Component({
  selector: 'app-sign-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, SignBaseView {

  @Input()
  OrderLogisticDetailId: string;
  @Input()
  OrderTrackServerId: string;
  @Input()
  ViewType: string;

  public ShipSignDetailModel: ShipSignDetailModel;
  constructor(private shipmentSignatureService: ShipmentSignatureService) { }

  ngOnInit() {
    console.log(this.OrderLogisticDetailId);
  this.reloaddata(this.OrderLogisticDetailId);
  }

  reloaddata(orderLogisticDetailId: string) {

    this.OrderLogisticDetailId = orderLogisticDetailId;
    this.shipmentSignatureService.detail(orderLogisticDetailId).subscribe(a => {

      console.log(a);
      this.ShipSignDetailModel = a;
    });
  }



}
