import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-field-error-display',
  templateUrl: './file-id-error-display.component.html',
  styleUrls: ['./file-id-error-display.component.css']
})
export class FileIdErrorDisplayComponent implements OnInit {

  @Input() errorMsg: string;
  @Input() displayError: boolean;
  @Input() field: string;
  @Input() inform: FormGroup;
  @Input() formSumitAttempt: boolean;
  @Input() installtip: string;
  constructor() { }

  ngOnInit() {

  }
  public isFieldValid(): boolean {
    return ((!this.inform.get(this.field).valid && this.inform.get(this.field).touched) ||
      (this.inform.get(this.field).untouched && this.formSumitAttempt));
  }

}
