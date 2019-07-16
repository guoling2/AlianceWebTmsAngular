import { Component, OnInit } from '@angular/core';
import {MyabnormaltaskserviceService} from '../../../services/orderabnormal/myabnormaltaskservice.service';
import {AbnormalTipViewModel} from '../../../models/badorder/abnormal-tip-view-model';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {until} from 'selenium-webdriver';
import titleIs = until.titleIs;
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-processdashbord',
  templateUrl: './processdashbord.component.html',
  styleUrls: ['./processdashbord.component.css']
})
export class ProcessdashbordComponent implements OnInit {

  tips: AbnormalTipViewModel[];

  selectedtip: AbnormalTipViewModel;

  searchp: FormGroup;

  constructor(private fb: FormBuilder, private myabnormaltaskserviceService: MyabnormaltaskserviceService, private router: Router, private titleService: Title) { }

  ngOnInit() {

    this.searchp = this.fb.group(
      { messageid: '', statued: '20'});

    this.reloaddata();
  }

  private  reloaddata() {

    this.myabnormaltaskserviceService.Query( this.searchp.getRawValue ()).subscribe((a) => {
      this.tips = a;
    });
  }

  onSelect(tip: AbnormalTipViewModel): void {
    this.selectedtip = tip;
    // this.router.
  }

  searching () {
    this.reloaddata();
  }
}
