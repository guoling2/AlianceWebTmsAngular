import {Component, OnInit, ViewChild} from '@angular/core';
import {CTracknumberservice} from '../../../services/trackordernumber/ctracknumberservice';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {GengerctracknumComponent} from './command/gengerctracknum/gengerctracknum.component';
import {AlertMessageType, EmitAlertMessage} from '../../../help/emit-alert-message';
import {EmitService} from '../../../help/emit-service';
import {TrackOrderNumberEntity} from '../../../models/tracknumbers/TrackOrderNumberEntity';
import {Commonsetting} from '../../../help/commonsetting';


@Component({
  selector: 'app-track-number-manager',
  templateUrl: './track-number-manager.component.html',
  styleUrls: ['./track-number-manager.component.css']
})
export class TrackNumberManagerComponent implements OnInit {

  public gridheight: number;

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  searchp: FormGroup;

  constructor(public emitService: EmitService, public cTracknumberservice: CTracknumberservice, private fb: FormBuilder, private dialog: MatDialog ) {
    this.gridheight = Commonsetting.GridHeight();
    this.searchp = this.fb.group(
      { serverTrackId: '', isued: '', bindlogistic: ''});

    // this.grid.toolbar = ['ExcelExport'];
  }

  ngOnInit() {



  }

  /**
   * 数据查询
   */
  searching(): void {



   // const  pagesetting = this.grid.pageSettings;

    // if (searchfirst) {
    //
    //   pagesetting.currentPage = 1;
    //
    //   if (this.grid.getSelectedRecords().length !== 0) {
    //     this.grid.clearSelection();
    //   }
    // }



    // const searchable = this.searchp.getRawValue ();
    // searchable.pageindex = pagesetting.currentPage;
    // searchable.pagesize = pagesetting.pageSize;

    const searchable = this.searchp.getRawValue ();

    console.log(searchable);

    this.cTracknumberservice.QueryByApplay(searchable).subscribe(result => {this.grid.dataSource = result; });
  }

  /**
   * 申请面单
   */
  opengenerctrackforms(): void {

    const dialogRef = this.dialog.open(GengerctracknumComponent, {
      height: '350em',
      width: '30em',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {

      // 关闭了


      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', result.Info));



    });

  }

  /**
   * Excel导出
   */
  excelout(): void {

    alert('导出了');
    this.grid.excelExport();
  }

  /**
   * 单号作废
   */
  deleteorder () {
    const selectedrows =  this.grid.getSelectedRecords();
    if (selectedrows.length === 0) {
    this.emitService.eventEmit.emit(
      new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择之后在进行操作！'));
    } else {

      const trackorders = new Array<string>();

      selectedrows.forEach(((value, index, array) => {

         trackorders.push((value as TrackOrderNumberEntity).TrackOrderNumber);
      } ));

      this.cTracknumberservice.Delete(trackorders).subscribe((a) => {

        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info));
        this.searching();
      });
    }
  }
}
