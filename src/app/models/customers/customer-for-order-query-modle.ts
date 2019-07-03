
export class CustomerQueryForOrdermodle {

  Area: string;
  LinkAddress: string;
  LinkMan: string;
  LinkTel: string;
  CustomerId: string;
  Name: string;
  Ismonth: boolean; // 默认月结
  Canmonthlysettle: boolean; // 可以月结吗
  AddressId: string;

}

export  class CustomerQueryForOrderType {

  public  static  CD = 'CD'; // 代号
  public  static  JC = 'JC'; // 简称
  public  static  KN = 'KN'; // 客户名称
  public  static  LK = 'LK'; // 联系人
  public  static  LT = 'LT'; // 联系电话
}
