export class VehicelTaskType {

  constructor(id, name) {
    this.TaskTypeId = id;
    this.TaskTypeName = name;
  }
  TaskTypeId: string;
  TaskTypeName: string;
}

export class VehicelTaskTypeDataSource {

  VehicelTaskTypeGroup = [new VehicelTaskType('1', '小车提货'),
    new VehicelTaskType('2', '市内配送'),
    new VehicelTaskType('3', '专线配载'),
    new VehicelTaskType('4', '中转外包'), ];

  /**
   * 小车提货
   */
  public XieCheTihuo(): VehicelTaskType{

    return  this.selecttasktype('1');
  }
  public  selecttasktype(id: string): VehicelTaskType {

    return  this.VehicelTaskTypeGroup.find(t => t.TaskTypeId === id);
  }
}
