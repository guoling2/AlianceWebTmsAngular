import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GroupOrderAtionModel} from '../group-order-ation-model';



@Component({
  selector: 'app-shipment-insidegroup',
  templateUrl: './sgroupinsidelist.component.html',
  styleUrls: ['./sgroupinsidelist.component.css']
})
export class SgroupinsidelistComponent implements OnInit {

  @Input()
  Title: string;

  @Input()
  GroupSubItemType;//类型

  @Output()
  public orderStoreSubject: BehaviorSubject<GroupOrderAtionModel> = new BehaviorSubject<GroupOrderAtionModel>(null);

  ngOnInit(): void {
  }
}
