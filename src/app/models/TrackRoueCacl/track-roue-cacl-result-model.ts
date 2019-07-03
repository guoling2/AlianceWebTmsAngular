import {TrackRouteRelationModel} from './track-route-relation-model';
import {TrackPointModel} from './track-point-model';

export class TrackRoueCaclResultModel {

  public PlanId: string;
  /// <summary>
  /// 合计运输时长
  /// </summary>
  public TotalTrackUseHours: number;

  /// <summary>
  /// 合计运输距离
  /// </summary>
  public TotalTrackDistance: number;

  public TrackDisPlay: string;


  public NodeCount: number;

  /// <summary>
  /// 走货网点
  /// </summary>
  public TransPoints: TrackPointModel[];


  public TrackRouteRelations: TrackRouteRelationModel[];
}
