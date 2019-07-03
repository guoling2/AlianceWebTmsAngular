import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displaytaxtype'
})
export class DisplaytaxtypePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let  displaylabelx = '未知';
      if (value === 'enterprise') {
        displaylabelx = '企业';
      } else if (value === 'person') {
        displaylabelx = '个人';
      } else {
      }

      return displaylabelx;
  }

}
