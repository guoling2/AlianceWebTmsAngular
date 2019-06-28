/**
 * 物流状态
 */
export class Wuliuorderstatued {

  public static Data: Object[] = [
    { Id: '0', DescName: '同城送货' },
    { Id: '1', DescName: '同城自提' },
    { Id: '10', DescName: '干线中转' },
    { Id: '20', DescName: '干线直送' },
    { Id: '21', DescName: '干线自提' },
    { Id: '30', DescName: '同城送货' },
    { Id: '31', DescName: '同城自提' },
    { Id: '32', DescName: '干线中转' },
    { Id: '40', DescName: '干线直送' },
    { Id: '100', DescName: '干线自提' }
  ];

  /**
   * 下拉列表的展示字段数据
   */
  public static DropDownListField: Object = { text: 'DescName', value: 'Id' };


}
