/**
 * 客户付款方式
 */
export class CargoReceiptPaperShowType {
  public static Data: Object[] = [
    { Id: '纸质回单', DescName: '纸质回单' },
    { Id: '电子回单', DescName: '电子回单' }

  ];


  /**
   * 下拉列表的展示字段数据
   */
  public static filed: Object = { text: 'DescName', value: 'Id' };

}

