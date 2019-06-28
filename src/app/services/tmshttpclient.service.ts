import { Injectable } from '@angular/core';
import {AppConfiguration} from '../auth/config/app-configuration';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../models/tms-response.module';
import {tap} from 'rxjs/operators';
import {Commonsetting} from '../help/commonsetting';

@Injectable({
  providedIn: 'root'
})
export class TmshttpclientService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:59471';
    }
    //  this.appConfiguration.Server = 'http://localhost:59471';
  }
  public  PostAsJson(object: object, url: string): Observable<TmsResponseModle> {

    const x = JSON.stringify(object);
    const jsonhead = new HttpHeaders({'Content-Type': 'application/json'});
    return  this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + url, x, {headers: jsonhead} )
      .pipe(
        tap(heroes => console.log(heroes)));

  }
}
