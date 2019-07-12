export class PageQueryResult<T> {


  public PageIndex: number;
  public PageSize: number;
  public TotalCount: number;
  public TotalPages: number;
  public InnerSort: string;
  public HasNextPage: boolean;
  public NextPageIndex: number;
  public PreviousPageIndex: number;
  public QueryResult: T;

  public ToDataGrid(): object {

    return {
      count: this.TotalCount,
      result: this.QueryResult
    };
  }
}
