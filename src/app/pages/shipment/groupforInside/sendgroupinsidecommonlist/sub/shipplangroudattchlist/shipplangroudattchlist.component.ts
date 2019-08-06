import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ShipplanGroupInsideServiceService} from '../../../../../../services/shiipplangroup/shipplan-group-inside-service.service';
import {Vehicelmodel} from '../../../../../../models/vehiclemanagement/vehicelmodel';
import {ShimentNoSendGroupView} from '../../../../../../models/shipplangroup/shiment-no-send-group-view';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PageQueryResult} from '../../../../../../models/page-query-result';

@Component({
  selector: 'app-shipplangroudattchlist',
  templateUrl: './shipplangroudattchlist.component.html',
  styleUrls: ['./shipplangroudattchlist.component.css']
})
export class ShipplangroudattchlistComponent implements OnInit {

  public form: FormGroup;

  displayedColumns: string[] = ['PlanGroupId', 'CarryingToolName',  'SendOrderCount', 'UserName', 'CreateDateTime'];

  customeraddressdatasource: ShimentNoSendGroupView[] = [];

  // tslint:disable-next-line:max-line-length
  constructor( private fb: FormBuilder, private shipplanGroupInsideservices: ShipplanGroupInsideServiceService, public dialogRef: MatDialogRef<ShipplangroudattchlistComponent>,
               @Inject(MAT_DIALOG_DATA) public parameter: string) { }

  ngOnInit() {
    this.form = this.fb.group({
      carname: ''
    });
    this.search();
  }

  close() {
    this.dialogRef.close();
  }

  search() {
    if (this.parameter === 'inside') {
      this.shipplanGroupInsideservices.SearchNoSendGroup(this.form.controls['carname'].value).subscribe((a: ShimentNoSendGroupView[]) => {
        this.customeraddressdatasource = a;
      });
    }

  }

  chosegroup(element: any) {
    this.dialogRef.close(element);
  }
}
