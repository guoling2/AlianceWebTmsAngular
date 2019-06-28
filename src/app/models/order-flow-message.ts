/**
 * 订单物流信息
 */
export class OrderFlowMessageEntity {
  public SystemOrderId: string;
  public OrderTrackServerId: string;
  public AskLocation: string;
  public Latitude: number;
  public Longitude: number;
  public TrackMessage: string;
  public TaskStatuedDesv: string;
  public CreateTime ?: Date;
}
