import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carryingStatuedPipe'
})
export class CarryingStatuedPipePipe implements PipeTransform {

  transform(value: number, args?: any): any {


    let resturnvalue = '未知';

    switch ( value ) {
      case 0:
        resturnvalue = '取消';

        break;
      case  10:
        resturnvalue = '未接单';
        break;
      case  20:
        resturnvalue = '执行中';
        break;
      case 30:
        resturnvalue = '任务完成';
        break;
    }

    return resturnvalue;

  }

}
