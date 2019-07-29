import {TmsDataEntity} from '../../../../models/tms-data-entity';

export class LogisticItemModel extends TmsDataEntity{

  ShipmentId:string;

  ShipmentPlanId: string;

  SquenceId: number;

  TrackServerId: string;

  Origincustomname: string;

  OrigincustomLinkman: string;

    DesctcustomName: string;

    DestLinkman: string;

  BeginLogisticStoreName: string;

  ActionStoreName: string;

  EndArea: string;

  EndStoreName: string;

  PlanOrderItemCount: number;

  PlanOrderItemWeight: number;

  PlanOrderItemVol: number;

  LogisticFee:number;

}
