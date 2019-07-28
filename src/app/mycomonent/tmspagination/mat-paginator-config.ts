import { MatPaginatorIntl } from '@angular/material';
const dutchRangeLabel = (page: number, pageSize: number, length: number) => {

  if (length === 0 || pageSize === 0) { return `0 到 ${length}`; }

  length = Math.max(length, 0);



  const startIndex = page * pageSize;



// If the start index exceeds the list length, do not try and fix the end index to the end.

  const endIndex = startIndex < length ?

    Math.min(startIndex + pageSize, length) :

    startIndex + pageSize;



  return `${startIndex + 1} - ${endIndex} 到 ${length}条`;

};

export function ChinesePaginatorIntl() {

  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = '当前页数:';

  paginatorIntl.nextPageLabel = '下一页:';

  paginatorIntl.previousPageLabel = '上一页:';

  paginatorIntl.getRangeLabel = dutchRangeLabel;

  return paginatorIntl;

}
