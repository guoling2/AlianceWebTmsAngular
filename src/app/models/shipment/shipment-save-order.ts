export class ShipmentSaveOrder {


  constructor ( acceptStoreId: string,
                orderIds: string[],
                sendlogisticstore: string,
                isorderself: boolean,
                isalreadyhasitem: boolean) {

    this.AcceptStoreId = acceptStoreId;

    this.OrderIds = orderIds;

    this.Sendlogisticstore = sendlogisticstore;

    this.Isorderself = isorderself;

    this.Isalreadyhasitem = isalreadyhasitem;

  }

  public AcceptStoreId: string;

  public OrderIds: string[];

  public Sendlogisticstore: string;

  public Isorderself: boolean;

  public Isalreadyhasitem: boolean;


}
