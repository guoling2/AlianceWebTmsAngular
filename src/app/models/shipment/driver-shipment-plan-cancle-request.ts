
export class DriverShipmentPlanCancleRequest {
  /// <summary>
  /// 在这里面的是全部运输的托运单
  /// </summary>
  public ShipmentId: Array<string>;

/// <summary>
/// 要取消的计划类型
/// </summary>
public  PlanType: ShipmentPlanCancleType;

/// <summary>
/// 强制解除
/// </summary>
public  IsForce: boolean;
}

export  enum ShipmentPlanCancleType {
  /**
   * 提货计划
   */
  TihuoPlan= 10,
  /**
   * 提货计划
   */
  PeiZai= 30
}
