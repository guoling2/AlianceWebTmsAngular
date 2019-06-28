import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class FormsControlServiceService {

  constructor() { }
  toFormGroup(questions: object ) {
    const group: any = {};



    // questions.forEach(question => {
    //   group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
    //     : new FormControl(question.value || '');
    // });

    console.log(group);
    return new FormGroup(group);
  }
}
