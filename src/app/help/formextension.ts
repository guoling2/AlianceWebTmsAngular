import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {IEmitService, EmitService} from './emit-service';
import { EmitAlertMessage, MessageShowType, AlertMessageType } from './emit-alert-message';

export class Formextension {

  /**
   * 验证forms数据
   *  formGroup
   */
  public  static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });

  }
  // : { [key: string]: Object }[] = []
  public static getFormValidationErrorsAndEmit(productForm: FormGroup, validationMessages: object,  iemitservice: EmitService= null) {



    console.log(validationMessages);

    Object.keys(productForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = productForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {


          // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          // console.log('错误消息');
          // console.log(validationMessages[key][keyError]);
          // console.log(iemitservice);
          if (iemitservice !== null) {
           try {
            console.log('错误消息');
            iemitservice.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Error, '错误', validationMessages[key][keyError], MessageShowType.Toast));
           } catch (error) {

            console.log(error);
           }

            // iemitservice.emit()
          }
        });
      }
    });
  }

}
