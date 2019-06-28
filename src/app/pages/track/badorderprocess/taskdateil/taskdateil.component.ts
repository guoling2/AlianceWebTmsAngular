import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bin-taskdateil',
  templateUrl: './taskdateil.component.html',
  styleUrls: ['./taskdateil.component.css']
})
export class TaskdateilComponent implements OnInit {

  public messageId: string;
  constructor( private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params.subscribe((params: {id: string}) => {
      this.messageId = this.route.snapshot.paramMap.get('id');
    });

  }


}
