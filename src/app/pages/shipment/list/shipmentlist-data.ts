import {ShipmentOrder, ShipmentOrderPlan} from '../../../models/shipment/shipment-plan-order';
import {ItemModel} from '@syncfusion/ej2-splitbuttons';


/**
 * 任务类型
 */
export const  TaskitemsDatsource: ItemModel[] = [ {
  text: '提货',
  iconCss: 'e-ddb-icons e-dashboard'
},
  {
    text: '转运',
    iconCss: 'e-ddb-icons e-notifications',
  },
  {
    text: '配送',
    iconCss: 'e-ddb-icons e-settings',
  }/*,
  {
    text: '退货',
    iconCss: 'e-ddb-icons e-settings',
  }*/
];

/**
 * 订单状态
 */
export const  OrderStatuedSource: ItemModel[] =  [
  {
    text: '已提货',
    iconCss: 'e-ddb-icons e-dashboard'
  },
  {
    text: '已卸货',
    iconCss: 'e-ddb-icons e-notifications',
  },
  {
    text: '已入库',
    iconCss: 'e-ddb-icons e-settings',
  },
  {
    text: '已出库',
    iconCss: 'e-ddb-icons e-logout'
  }/*,
    {
      text: '已发运',
      iconCss: 'e-ddb-icons e-logout'
    }, {
      text: '运输完成',
      iconCss: 'e-ddb-icons e-logout'
    },*/
];
