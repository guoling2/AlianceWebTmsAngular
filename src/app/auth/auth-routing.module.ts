import {APP_INITIALIZER, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './component/login/login.component';
import {CallBackComponent} from './component/callBack/call-back.component';
import {UnauthorizedComponent} from './component/unauthorized/unauthorized.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'callback', component: CallBackComponent},
  { path: 'unauthorized', component: UnauthorizedComponent}
];



@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes)],
  declarations: [LoginComponent, UnauthorizedComponent, CallBackComponent]
})

export class AuthRoutingModule {}
