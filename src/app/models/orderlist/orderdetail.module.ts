import {OrderitemModule} from './orderitem.module';

export class ReceivingBillModle {

  public DisOrderId: string;

  public ReceivingBillId: string;

  public CustomerOrderId: string;

  public DisAmount: number;

  public IsDelaySend: boolean;

  public IsDelayReceive: boolean;

  public DisMark: string;

  public CreateCompany: string;

  public CreateDatetime: Date;

  public OrderStatued: string;

  public CreateComanyId: string;


  public DisCompanyName: string;


  public DisCompanyId: string;


  public ManagerFee: number;


  public TotalCount: number;


  public TotalWeight: number;


  public TotalVolume: number;


  public Origincustomname: string;

  public Originlinkman: string;

  public  Originlinktel: string;

  public Originarea: string;


  public OriginAddress: string;


  public Destcustomname: string;


  public Destarea: string;


  public Destlinkman: string;


  public Desttel: string;


  public DestAddress: string;


  public IsMySelfOrder: boolean;

  public ReceivingBillItemCollections: OrderitemModule[];

}
