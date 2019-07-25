import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-selectvehicel',
  templateUrl: './selectvehicel.component.html',
  styleUrls: ['./selectvehicel.component.css']
})
export class SelectvehicelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SelectvehicelComponent>,
              @Inject(MAT_DIALOG_DATA) public parameter: string) { }

  ngOnInit() {
  }

}
