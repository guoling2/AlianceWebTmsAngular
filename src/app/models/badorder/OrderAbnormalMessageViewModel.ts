import { OrderHasExceptionViewModel } from './OrderHasExceptionViewModel';
import {Tmsdocument} from '../tmsdocument';

export class OrderAbnormalMessageViewModel {

  get HasExceptionOrderViewModel(): OrderHasExceptionViewModel {
    return this._HasExceptionOrderViewModel;
  }

  set HasExceptionOrderViewModel(value: OrderHasExceptionViewModel) {
    this._HasExceptionOrderViewModel = value;
  }

  private _HasExceptionOrderViewModel: OrderHasExceptionViewModel;


  public MessageId: string;

  public HappendTime: Date;
  /**
   * 发生环节
   */
  public OrderModule: string;

  public LinlkPeople: string;
  /**
   * 问题
   */
  public QuestionMsg: string;

  public OrderItemName: string;

  public OrderItemCount?: number;

  public MsgMark: string;

  public SubmitUserName: string;

  public ResponseLogisticStoreName: string;

  public Documents: Tmsdocument[];

  public QuestionCliam: string;

  public ProcessStatued: string;

}

