import {Tmsdocument} from '../tmsdocument';

export class ShipSignDetailModel {

  public OrderTrackServerId: string;

  public SystemOrderId: string;

  public OrderDocuments: Tmsdocument[]; // 附件信息列表

  public SingaMemberType: string;

  public CreateUser: string;

  public SignUserName: string;

  public SignDateTime?: Date;

  public SingaInfo: string;

  public Daishoudian: string;

  public IsNormalSinga: boolean;
}
