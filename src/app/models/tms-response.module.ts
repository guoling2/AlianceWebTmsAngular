import {AbstractControl, ValidationErrors} from '@angular/forms';

export  class TmsresponseStatusCode {

  static Succeed = (): number => {return  200;
  }
}
export class TmsResponseModle {

  constructor(
    public statusCode: number,

     public info: string,

     public data: object[]= null) {

    this.StatusCode = statusCode;
    this.Info = info;
    this.Data = data;

  }


     public  StatusCode: number;
     public  Info: string;
     public  Data ?: any;
}
