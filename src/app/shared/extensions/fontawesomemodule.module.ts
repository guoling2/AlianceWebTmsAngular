import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconRegistry} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FontawesomemoduleModule {

  constructor(private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
