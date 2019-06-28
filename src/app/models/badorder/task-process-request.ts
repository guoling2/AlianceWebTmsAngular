export class TaskProcessRequest {
  public  MessageId: string;
  /**
   * 参考TaskProcessCommands
   */
  public  Command: string;
}
export class TaskProcessCommands {

  public static Message_ACCEPT(): string {
    return 'accept';
  }
}
