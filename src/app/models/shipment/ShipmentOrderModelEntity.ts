/**
 * 网点录单的实体
 */
import {ShipmentOrderItemModelEntity} from './ShipmentOrderItemModelEntity';

export class  ShipmentOrderModelEntity {

  /**
   * 客户单号
   */
  public CustomerOrderId: string;
  /// <summary>
  /// 物流单号
  /// </summary>
  public TrackOrderNumber: string;

  /// <summary>
  /// 上门提货
  /// </summary>
  public Tihuo: boolean;

  /// <summary>
  /// 免费提货
  /// </summary>
  public FeeTihuo: boolean;
  /// <summary>
  /// 轻货
  /// </summary>
  public Piaohuo: boolean;
  /// <summary>
  /// 重货
  /// </summary>
  public Zhonghuo: boolean;
  /// <summary>
  /// 大车直送
  /// </summary>
  public ToDestCustomerNoRound: boolean;

  /// <summary>
  /// 要求提货时间
  /// </summary>
  public AskTihuoTime?: Date;

  /// <summary>
  /// 业务员编码
  /// </summary>
  public BuinessCode: string;
  /// <summary>
  /// 发货客户名称
  /// </summary>
  public Origincustomname: string;
  /// <summary>
  /// 发货联系人
  /// </summary>
  public OrigincustomLinkman: string;
  /// <summary>
  /// 发货联系手机号码
  /// </summary>
  public Origintel: string;
  /// <summary>
  /// 发货地址
  /// </summary>
  public OriginAddress: string;

  /// <summary>
  /// 到货客户名称
  /// </summary>
  public Destcustomname: string;
  /// <summary>
  /// 到货联系人
  /// </summary>
  public DestcustomLinkman: string;
  /// <summary>
  /// 到货联系手机号码
  /// </summary>
  public Desttel: string;
  /// <summary>
  /// 到货地址
  /// </summary>
  public DestAddress: string;
  /**
   * 品相
   */
  public ShipmentOrderItems: ShipmentOrderItemModelEntity[];
}
