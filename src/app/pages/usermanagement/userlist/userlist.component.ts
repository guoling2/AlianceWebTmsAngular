import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeUserService} from '../../../services/usermanagement/employee.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  adminuser = null;

  constructor(private fb: FormBuilder, private _oidcSecurityService: OidcSecurityService, private employeesvice: EmployeeUserService) { }

  ngOnInit() {

    this._oidcSecurityService.getUserData().subscribe(value => {

      if (value.storeowner) {
        this.adminuser = value;
      }

      // console.log(value);

    });


    this.searchp = this.fb.group(
  { worknumber: '', realname: ''});
    this.gridheight = Commonsetting.GridHeight();
  }

  dataStateChange ( $event ) {

    this.searching();
  }

  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.employeesvice.Query(searchable).subscribe(result => {

      this.grid.dataSource = result;

    });

  }
}
