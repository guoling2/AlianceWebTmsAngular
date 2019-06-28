import { Component, OnInit } from '@angular/core';
import {Tmsdocument} from '../../../../../../models/tmsdocument';
import {OrderAbnormalFileService} from '../../../../../../services/orderabnormal/order-abnormal-file.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-abnormal-file',
  templateUrl: './order-abnormal-file.component.html',
  styleUrls: ['./order-abnormal-file.component.css']
})
export class OrderAbnormalFileComponent implements OnInit {

  public Documents: Tmsdocument[];

  public MessageId: string;

  constructor(
    private route: ActivatedRoute,
    private orderAbnormalFileService: OrderAbnormalFileService) { }

  ngOnInit() {
    this.route.params.subscribe((params: {id: string}) => {
      this.MessageId = this.route.snapshot.paramMap.get('id');
      this.orderAbnormalFileService.list(this.MessageId).subscribe((a) => {
        this.Documents = a;
      });
    });
  }
}
