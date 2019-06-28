import {ShipmentOrder, ShipmentOrderPlan} from '../../../models/shipment/shipment-plan-order';


export const MockShipmentPareOrders: ShipmentOrder[] = [
  {

     ShipmentId: 'L100004008181996814020',
     ServerTrackId: '991115289928277884',
     OrderStatedDesc: '未提货',
     OrderStatedInt: 0,
     AcceptStoreName: '烟台芝罘货站',
     AcceptOrderCount: 1402 ,
     SendOrderCount: 0 ,
     AcceptDateTime: new Date(Date.now()),
     OrderSendMark: '备注',
    ShipmentOrderPlans: [
      {ShipmentId: 'L100004008181996814020', PlanId: 'LP100004000019',
        ShipmentPeopleDesc: '郭亮', CarryingToolName: '未提报',
        TaskType: '提货', PublishTaskCount: 1402,
        PublishDateTime: new Date(Date.now()), CarryingStatuedDesc: '已发布', Destarea: '烟台市'}]
  }
];

export const MockShipmentOrderPlan: ShipmentOrderPlan[] = [
  {
     ShipmentId: 'L100004008181996814020', PlanId: 'LP100004000019',
     ShipmentPeopleDesc: '郭亮', CarryingToolName: '未提报',
     TaskType: '提货', PublishTaskCount: 1402,
     PublishDateTime: new Date(Date.now()), CarryingStatuedDesc: '司机已接单', Destarea: '烟台市'
  }
];


