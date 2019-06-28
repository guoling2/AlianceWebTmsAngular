import { Injectable } from '@angular/core';
import {AlertModel} from '../component/tms/alert/alertdata';
import {DialogAlertComponent} from '../component/tms/alert';
import { DataManager, Query, JsonAdaptor } from '@syncfusion/ej2-data';
import {MatDialog} from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class DialogservicesService {

  constructor( private dialog: MatDialog) { }

  /**
   * 打开一个对话框
   */
  public openDialog(alertmodel: AlertModel): void {



    const datamanger = new DataManager();

    const dialogRef = this.dialog.open(DialogAlertComponent, {
      width: '250px',
      disableClose: true,
      data: {Title: alertmodel.Title, Message: alertmodel.Message, ConfirmModel: alertmodel.ConfirmModel}
    });

    if ((alertmodel.Callback != null)) {
      dialogRef.afterClosed().subscribe(result => {

        alertmodel.Callback(result);

      });
    }

  }
}
