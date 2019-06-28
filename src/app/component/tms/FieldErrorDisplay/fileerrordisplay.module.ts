import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileIdErrorDisplayComponent } from './file-id-error-display.component';
import { FileErrorDisplayDirectiveDirective } from './file-error-display-directive.directive';

@NgModule({
  declarations: [FileIdErrorDisplayComponent, FileErrorDisplayDirectiveDirective],
  exports: [
    FileIdErrorDisplayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FileerrordisplayModule { }
