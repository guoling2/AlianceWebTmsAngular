import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carryingtasktypePipe'
})
export class CarryingTaskPipePipe implements PipeTransform {

  transform(value: number, args?: any): any {


    let resturnvalue = '未知';

    switch ( value ) {
      case 1:
        resturnvalue = '提货任务';

        break;
      case  3:
        resturnvalue = '配送任务';
        break;

      case 30:
        resturnvalue = '已提货/在途';
        break;
      case  40:
        resturnvalue = '任务完成';
        return;
    }

    return resturnvalue;

  }

}
