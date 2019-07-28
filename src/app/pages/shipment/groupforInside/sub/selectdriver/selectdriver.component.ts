import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Vehicelmodel} from '../../../../../models/vehiclemanagement/vehicelmodel';

@Component({
  selector: 'app-selectdriver',
  templateUrl: './selectdriver.component.html',
  styleUrls: ['./selectdriver.component.css']
})
export class SelectdriverComponent implements OnInit {

  public form: FormGroup;

  displayedColumns: string[] = ['VehicelName', 'StatuedDesc', 'PrimaryDriverName', 'ContainerModelName', 'Volumecapacity', 'Weightcapacity'];

  public displaytithle = '';
  customeraddressdatasource: Vehicelmodel[] = [];

  constructor( public dialogRef: MatDialogRef<SelectdriverComponent>,
               private fb: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public parameter: string) { }

  ngOnInit() {
    this.form = this.fb.group({
      VehicelName: '' ,
      Volumecapacity: '',
      Weightcapacity: ''
    });
  }

  search() {

  }

  chosevehicel(element: Vehicelmodel) {

  }

  close() {
    this.dialogRef.close();
  }
}
