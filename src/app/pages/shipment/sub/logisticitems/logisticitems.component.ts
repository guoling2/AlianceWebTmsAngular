import {Component, OnInit, ViewChild} from '@angular/core';
import {EditSettingsModel, ToolbarItems} from '@syncfusion/ej2-grids';
import {LogisticItemServiceService} from './logistic-item-service.service';
import {GridComponent} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-shipmentplan-insert-logisticitems',
  templateUrl: './logisticitems.component.html',
  styleUrls: ['./logisticitems.component.css']
})
export class LogisticitemsComponent implements OnInit {


  // public newRowPosition: { [key: string]: Object }[] = [
  //   { id: 'Top', newRowPosition: 'Top' },
  //   { id: 'Bottom', newRowPosition: 'Bottom' }
  // ];
  //


  @ViewChild('logitsticitemgrid', {static: true})
  public grid: GridComponent;

  constructor(private itemServiceService:LogisticItemServiceService) { }

  public datasoce:any;
  public editSettings: EditSettingsModel;
  ngOnInit() {

    this.editSettings = {  allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top' };

    console.log(this.grid.editSettings);
    this.itemServiceService.LogisiticItemAddBehavior.subscribe(next=>{


      this.grid.dataSource=this.itemServiceService.LogisticItemSource;
      if (next!=null){
        this.grid.refresh();
      }
      console.log('加载数量'+this.itemServiceService.LogisticItemSource.length);

    });

  }

  reload() {



  }
}
