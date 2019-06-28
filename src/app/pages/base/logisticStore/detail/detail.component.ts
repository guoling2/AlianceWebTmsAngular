import { Component, OnInit } from '@angular/core';
import { LogisticStoreEntity } from '../../../../models/base/logistic-store-entity';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {LogisticstoreService} from '../../../../services/base/logisticstore.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public logisticdetail: LogisticStoreEntity;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, public dialog: MatDialog, public logisticstoreService: LogisticstoreService ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.logisticstoreService.Detail(id).subscribe(result => {
     console.log(result);
      this.logisticdetail = result;
    });

  }
}
