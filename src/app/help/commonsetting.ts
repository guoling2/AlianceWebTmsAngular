import {HttpHeaders} from '@angular/common/http';

export class Commonsetting{

  public static GridHeight(): number {

    return document.documentElement.clientHeight - 310;
  }
  public static GridHeight2(): number {

    return document.documentElement.clientHeight - 320;
  }
  public  static HttpJsonHead(): HttpHeaders {
    return  new HttpHeaders({'Content-Type': 'application/json'});
  }
}
