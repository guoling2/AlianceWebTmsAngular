export class ShipmentPlanOrderPriceBlace {

  public static Data: Object[] = [
    { Id: '10', DescName: '按单数' },
    { Id: '20', DescName: '按件数' },
    { Id: '30', DescName: '按重量' },
    { Id: '40', DescName: '按体积' }
  ];

  /**
   * 下拉列表的展示字段数据
   */
  public static DropDownListField: Object = { text: 'DescName', value: 'Id' };

}
