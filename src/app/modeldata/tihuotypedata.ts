/**
 * 到货方式
 */
export class TihuoType {

  public static Data: Object[] = [
    { Id: '10', DescName: '同城送货' },
    { Id: '20', DescName: '同城自提' },
    { Id: '30', DescName: '干线中转' },
    { Id: '40', DescName: '干线直送' },
    { Id: '50', DescName: '干线自提' }
  ];

  /**
   * 下拉列表的展示字段数据
   */
  public static DropDownListField: Object = { text: 'DescName', value: 'Id' };

}


