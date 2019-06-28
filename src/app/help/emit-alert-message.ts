export class EmitAlertMessage {

   constructor (messageType: AlertMessageType, title: string, message: string, showType: MessageShowType= MessageShowType.Alert) {

     this.Title = title;
     this.Message = message;
     this.MessageType = messageType;
     this.ShowType = showType;
   }
  public  MessageType: AlertMessageType;

  public  Title: string;

  public  Message: string;
  
  public  ShowType: MessageShowType;
}

export enum AlertMessageType { Info, Error, Succeed}
export enum  MessageShowType { Alert, Toast}
