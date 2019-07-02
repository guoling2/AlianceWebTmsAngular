
export class CustomerTaxModle {

  public Id: number;

  public Invoicetype: string;

  public Invoicetitle: string;

  public Taxno: string;

  public Bankname: string;

  public Bankaccountno: string;

  public Address: string;

  public Tel: string;

  public Enabel: boolean;

  public OwnCompany: string;

  // 用于选择开票资料 这个属于发货客户还是收货客户
  // 在订单录入的时候
  public SelectType: string;

}
