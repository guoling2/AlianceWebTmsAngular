import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {TrackNumberManagerComponent} from './tracknumber/track-number-manager.component';
import {SharedModule} from '../../shared/shared.module';
import { GengerctracknumComponent } from './tracknumber/command/gengerctracknum/gengerctracknum.component';




const routes: Routes = [
  {
    'path': 'tacknumber',
    'component': TrackNumberManagerComponent},
  {
  'path': 'stores',
     'loadChildren': './logisticStore/logisticstore.module#LogisticstoreModule'
  },
  {
    'path': 'logisticroute',
    'loadChildren': './logisticRoute/logistic-route.module#LogisticRouteModule'
  },
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule
   ],
  entryComponents: [GengerctracknumComponent],
  declarations: [TrackNumberManagerComponent, GengerctracknumComponent]
})
export class BizBaseModuleModule { }
