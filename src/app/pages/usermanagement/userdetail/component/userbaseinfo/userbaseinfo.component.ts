import {Component, Input, OnInit} from '@angular/core';
import {EmplayeeUser} from '../../../../../models/User/emplayee';
import {ej} from '@syncfusion/ej2-inputs/dist/global';
import {BehaviorSubject} from 'rxjs';
import {LogisticStore} from '../../../../../models/LogisticStore/logistic-store';

@Component({
  selector: 'app-user-info',
  templateUrl: './userbaseinfo.component.html',
  styleUrls: ['./userbaseinfo.component.css']
})
export class UserbaseinfoComponent implements OnInit {


  @Input() emplayeeUser: EmplayeeUser;

  constructor() { }

  ngOnInit() {
  }

}
