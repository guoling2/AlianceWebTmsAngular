import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppConfiguration {
  /*
   远程服务器地址
   */
  public Server = 'https://localhost:44390/';

}
