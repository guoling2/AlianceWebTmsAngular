type AlertCallBack = (arg1: any) => void;

export interface AlertModel {
  Title: string;
  Message: string;
  ConfirmModel ?: boolean;
  Callback ?: AlertCallBack;
}
