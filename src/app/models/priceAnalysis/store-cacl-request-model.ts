export class StoreCaclRequestModel {
  public  BeginStoreId: string;
  public BeginTihuoAreaCode: string;
  public EndAreaCode: string;
  public EndStoreId: string;
  public IfCargoFromOrigin: boolean;
  public IfCargoReturnWarehouse: boolean;
  public IfDesctPickUpMySelf: boolean;
  public LoopStoreIds:  string[];
  public TotalCount: number;
  public TotalVol: number;
  public TotalWeight: number;

}
