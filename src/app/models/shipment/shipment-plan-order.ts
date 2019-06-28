export interface ShipmentOrder {
  /**
   * 运单号
   */
   ShipmentId: string;
  /**
   * 物流跟踪号
   */
    ServerTrackId: string;
  /**
   * 接单网点
   */
   AcceptStoreName: string;
  /**
   * 未发运的件数
   */
   AcceptOrderCount: number;
  /**
   * 已经发运的件数
   */
   SendOrderCount: number;

   OrderStatedDesc: string;

   OrderStatedInt: number;
  /**
   * 接单时间
   */
   AcceptDateTime: Date;
  /**
   * 备注
   */
   OrderSendMark: string;

  /**
   * 运输计划
   */
   ShipmentOrderPlans ?: ShipmentOrderPlan[];
}

export class ShipmentOrderPlan {
  /**
   * 运单号
   */
    ShipmentId: string;

  /**
   * 计划编号
   */
    PlanId: string;

  /**
   * 运输人/司机
   */
    ShipmentPeopleDesc: string;

  /**
   * 运输载具
   */
    CarryingToolName: string;
  /**
   * 任务类型
   */
   TaskType: string;


  /**
   * 委托数量
   */
    PublishTaskCount: number;

  /**
   * 任务发布时间
   */
    PublishDateTime: Date;
  /**
   * 对方接单时间
   */
    AcceptDateTime ?: Date;
  /**
   * 对方完成时间
   */
    FinishDateTime ?: Date;
  /**
   * 司机任务状态
   */
  CarryingStatuedDesc: string;

  /**
   * 目的地
   */
    Destarea: string;

}
