import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {ReceivingBillModle} from '../../../../models/orderlist/orderdetail.module';



@Component({
  selector: 'app-order-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class CustomerOrderDetailComponent implements OnInit {

  ordermodel: ReceivingBillModle;
  constructor(

    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);

    // this.orderService.OrderDetai(id).subscribe(result => {
    //
    //   console.log('加载明细数据');
    //
    //   console.log(result);
    //   // console.log(result);
    //   this.ordermodel = result;
    //   // console.log(result.data.ts);
    // });
  }

}
