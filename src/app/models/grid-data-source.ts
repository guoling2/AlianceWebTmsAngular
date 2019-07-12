import {PageQueryResult} from './page-query-result';

export class GridDataSource {

  constructor(data: any) {

    this.count = data.TotalCount;
    this.result = data.QueryResult;
  }

  public count: number;
  public result: object;
}
