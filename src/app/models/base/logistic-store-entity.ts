/**
 * 物流公司经营网点
 */
export class LogisticStoreEntity {

  public StoreId: string; // 网点编号
  public StoreName: string; // 网点名称
  public LinkMan: string; // 发货联系人
  public LinkTel: string; // 联系电话
  public StoreProvice: string; // 发货网点省
  public StoreCity: string; // 发货网点市
  public StoreArea: string; // 发货网点区域
  public StoreAddessDetail: string; // 发货网点地址
  public OwnCompanyName: string; // 所属公司名称
  public CreateUserDate: Date; // 创建时间
  public StoreOwnUserId: string; // 用户ID
  public IsEnable: boolean; // 是否可用
  public OwnCompanyId: string; // 所属公司编号
  public Lng: number; // 经度
  public Lat: number; // 纬度
  public BuinessContent: string; // 业务信息
  public GoodsSendAreaMsg: string; // 发货区域信息
  public TihuoMoneyMsg: string; // 提货费信息
  public SonghuoMoneyMsg: string; // 送货费信息
  public Desc: string; // 服务描述
  public BuinessTimeMsg: string; // 营业时间信息
  public IsManageBranch: boolean; // 是否是总部
  public BranchLevel: string; // 网点类型;
  public AreaCode: string; // 区号
  public StoreTypeId: string;
}
