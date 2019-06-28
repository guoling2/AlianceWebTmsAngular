/**
 * StoreType
 */
export class StoreType {

  public static Data: Object[] = [
    { Id: '10', DescName: '直营' },
    { Id: '20', DescName: '加盟' },
    { Id: '30', DescName: '代理网点' }
  ];

  /**
   * 下拉列表的展示字段数据
   */
  public static DropDownListField: Object = { text: 'DescName', value: 'DescName' };

}

