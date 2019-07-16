import {Component, Inject, OnInit} from '@angular/core';
import {OrderFlowMessageServices} from '../../../services/base/orderflowmessageservices';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderFlowMessageEntity} from '../../../models/order-flow-message';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-orderflowmessag',
  templateUrl: './orderflowmessag.component.html',
  styleUrls: ['./orderflowmessag.component.css']
})
export class OrderflowmessagComponent implements OnInit {

 public messresult: OrderFlowMessageEntity[];

  constructor(private orderFlowMessageServices: OrderFlowMessageServices, public dialogRef: MatDialogRef<OrderflowmessagComponent>,
              @Inject(MAT_DIALOG_DATA) public datasource: string) { }

  ngOnInit() {

    // const trackorderid = this.route.snapshot.paramMap.get('trackorderid');

    this.orderFlowMessageServices.Search(this.datasource).subscribe((a) => {

      this.messresult = a;
    });
  }

}
