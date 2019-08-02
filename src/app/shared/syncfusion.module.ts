import { NgModule } from '@angular/core';
import {Edit, GridModule, Page} from '@syncfusion/ej2-angular-grids';
import { ButtonModule, CheckBoxModule, RadioButtonModule} from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DetailRowService, PageService } from '@syncfusion/ej2-angular-grids';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { TreeViewModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { DropDownButtonModule, SplitButtonModule, ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { Grid, DetailRow, Toolbar, PdfExport, ExcelExport } from '@syncfusion/ej2-grids';
import { TextBoxModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { loadCldr } from '@syncfusion/ej2-base';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';


// loadCldr(enNumberData, entimeZoneData);


@NgModule({
  imports: [
    DateTimePickerModule,
    TextBoxModule, NumericTextBoxModule,
    GridModule, CheckBoxModule, DropDownListModule, ButtonModule, SwitchModule,
    ListViewModule,
    TreeViewModule,
    TabModule,
    RichTextEditorAllModule,
    ToastModule, DropDownButtonModule, RadioButtonModule, TooltipModule, SplitButtonModule, ProgressButtonModule
  ],

  exports: [
    DateTimePickerModule,
    TextBoxModule, NumericTextBoxModule,
    GridModule, CheckBoxModule, DropDownListModule, ButtonModule, SwitchModule,
    ListViewModule,
    TreeViewModule,
    TabModule,
    RichTextEditorAllModule,
    ToastModule, DropDownButtonModule, RadioButtonModule, TooltipModule, SplitButtonModule, ProgressButtonModule
  ],
   providers: [
    DetailRowService, PageService
  ]
})

export class SyncfusionModule {


  constructor() {
    Grid.Inject(Edit, Toolbar, Page, PdfExport, ExcelExport);
   // Grid.Inject(Toolbar, PdfExport, ExcelExport);
  }

}
