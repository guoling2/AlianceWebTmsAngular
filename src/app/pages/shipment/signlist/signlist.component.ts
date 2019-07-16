import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataStateChangeEventArgs, GridComponent, RowSelectEventArgs} from '@syncfusion/ej2-angular-grids';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {Basereportservice} from '../../../services/base/basereportservice';
import {$e} from 'codelyzer/angular/styles/chars';
import {AddComponent} from './add/add.component';
import {DetailComponent} from './detail/detail.component';
import {SignViewChangeDirective} from './sign-view-change.directive';
import {SignViewServiceService} from './sign-view-service.service';
import {SignViewItem} from './sign-view-item';
import {SignBaseView} from './sign-base-view';

@Component({
  selector: 'app-signlist',
  templateUrl: './signlist.component.html',
  styleUrls: ['./signlist.component.css']
})
export class SignlistComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})

  public grid: GridComponent;

  @ViewChild(SignViewChangeDirective, {static: false}) signview: SignViewChangeDirective;

  ads:  SignViewItem[];

  public isselect = false;

  constructor(private signViewServiceService: SignViewServiceService, private componentFactoryResolver: ComponentFactoryResolver, private fb: FormBuilder, private service: Basereportservice ) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', IsSign: '-1'},

      );
    this.gridheight = Commonsetting.GridHeight2();

    this.ads = this.signViewServiceService.getviews();
  }

  searching() {
    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.service.SearchReport(Basereportconfig.Report_logisticordersignlist, searchable).subscribe(result => {

      this.grid.dataSource = result;

    });
  }

  dataStateChange($event: DataStateChangeEventArgs) {
    this.searching();
  }




  rowselect($event: RowSelectEventArgs) {

    this.isselect = true;

    console.log($event.data);
    console.log($event.data['OrderLogisticDetailId']);
    console.log($event.data['IsSign']);

    let  signViewItem;
    switch ($event.data['IsSign']) {

      case  '未签收':
        signViewItem = this.ads[0].component;
        break;
      case '签收':
        signViewItem = this.ads[1].component;
        break;

      default:
        signViewItem = this.ads[2].component;
        break;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(signViewItem);
    const viewContainerRef = this.signview.viewContainerRef;
    console.log(viewContainerRef);

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<SignBaseView>componentRef.instance).OrderLogisticDetailId = $event.data['OrderLogisticDetailId'];
    (<SignBaseView>componentRef.instance).OrderTrackServerId = $event.data['OrderTrackServerId'];


  }
}
