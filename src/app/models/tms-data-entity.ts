export   class TmsDataEntity {

  constructor() {
    this.UpdateModelType = UpdateModelType.Unchanged;
  }
   UpdateModelType: UpdateModelType;

}

export enum UpdateModelType {

  Unchanged = 0,
  Insert = 1,
  Update = 2,
  Delete = 3,
  // 附加
  Attach= 4,
  // 取消附加
  CancelAttach
}
