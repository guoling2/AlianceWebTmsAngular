

export class OrderHasExceptionViewModel {
  /**
   * 物流跟踪号
   */
  public TrackServerId: string;
  /**
   * 到货客户
   */
  public DestCustomer: string;
  /**
   * 到货联系
   */
  public DestCustomerLinkTel: string;
  /**
   * 录单网点
   */
  public  OriginStation: string;
  /**
   * 订单创建时间
   */
  public OrderCreateDateTime: Date;
  /**
   * 运输路径
   */
  public TransportLine: string;
  /**
   * 订单状态
   */
  public LogisticOrderStatuedDesc: string;
  /**
   * 到货方式
   */
  public OrderDestServices: string;
  /**
   * 物流跟踪号
   */
  public OriginCreateUserName: string;

  public DestCustomerAddress: string;

  public OriginCustomer: string;
}
