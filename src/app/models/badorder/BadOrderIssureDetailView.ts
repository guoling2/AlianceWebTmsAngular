import {Tmsdocument} from '../tmsdocument';


export class BadOrderIssureDetailView {
  public OrderId: string;
  public OccurTime: Date; // 发生时间
  public FeedackStation: string; // 反馈网点
  public RelationTo: string; // 关联方
  public ExceptionType: string; // 异常类型
  public ExceptionItemName: string; // 异常品相
  public ExceptionItemCount: number; // 异常件数
  public ExceptionDescription: string; // 异常描述
  public ExtendInformationModels: Tmsdocument[]; // 附件信息列表
}
