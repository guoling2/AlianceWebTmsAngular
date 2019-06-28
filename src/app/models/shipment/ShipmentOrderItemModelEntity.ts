/**
 * 网点录单的实体
 */
export class ShipmentOrderItemModelEntity {
  /**
  /* 货物名称
  */

  public Package: string;

  /**
  /* 货物包装单位   默认件
  */

  public PackingType: string;
  /**
  /*货物数量
  */
  public PackageCount: number;

  /**
  /* 订单货物体积 立方米
  */
  public PackageVolM: number;

  /**
  /* 订单货物重量 千克
  */
  public PackageWeightKg: number;

  /**
  /* 长
  */
  public PackageLength ?: number;

  /**
  /* 宽
  */
  public PackageWidth ?: number;

  /**
  /* 高
  */
  public PackageHigh ?: number;


}
