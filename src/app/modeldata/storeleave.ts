/**
 * 到货方式
 */
export class StoreLeave {

  public static Data: Object[] = [
    { Id: '10', DescName: '网点' },
    { Id: '20', DescName: '一级分拨中心' },
    { Id: '30', DescName: '二级分拨中心' },
    { Id: '40', DescName: '合作公司' },
    { Id: '50', DescName: '仓库中心' }
  ];

  /**
   * 下拉列表的展示字段数据
   */
  public static DropDownListField: Object = { text: 'DescName', value: 'DescName' };

}

