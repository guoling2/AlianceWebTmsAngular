export  class XieCheScanResponseModel {
  get ActionStoreId (): string {
    return this._ActionStoreId;
  }

  set ActionStoreId ( value: string ) {
    this._ActionStoreId = value;
  }
  get XieCheId (): string {
    return this._XieCheId;
  }

  set XieCheId ( value: string ) {
    this._XieCheId = value;
  }
  private _XieCheId: string;
  private _XieCheCode: string;
  public get XieCheCode(): string {
    return this._XieCheCode;
  }
  public set XieCheCode(value: string) {
    this._XieCheCode = value;
  }
  private _OrderCount: number;
  public get OrderCount(): number {
    return this._OrderCount;
  }
  public set OrderCount(value: number) {
    this._OrderCount = value;
  }
  private _PlanStatuedId: number;
  public get PlanStatuedId(): number {
    return this._PlanStatuedId;
  }
  public set PlanStatuedId(value: number) {
    this._PlanStatuedId = value;
  }
  private _ProcessMsg: string;
  public get ProcessMsg(): string {
    return this._ProcessMsg;
  }
  public set ProcessMsg(value: string) {
    this._ProcessMsg = value;
  }
  private _ActionStoreId: string;
}
