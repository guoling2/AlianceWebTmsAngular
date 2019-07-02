/**
 * 客户付款方式
 */
export class CustomePaymentMethod {
  public static Data: Object[] = [
    { Id: '0', DescName: '未设置' },
    { Id: '10', DescName: '已付' },
    { Id: '20', DescName: '到付' },
    { Id: '30', DescName: '提付' },
    { Id: '40', DescName: '回单付' },
    { Id: '50', DescName: '月结' }
  ];
  /**
   * 月结代号
   */
  public  static  PaymentMehodDataForMonth:string = '50';

  /**
   * 下拉列表的展示字段数据
   */
  public static filed: Object = { text: 'DescName', value: 'Id' };

}

