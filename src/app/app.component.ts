import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter, map, mergeMap} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}
  ngOnInit() {

    this.router.events.pipe (
      filter (( event ) => event instanceof NavigationEnd),
      map (() => this.activatedRoute),
      map (route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter (route => route.outlet === 'primary'),
      mergeMap (route => route.data)
    )
      .subscribe (( event ) => {
        if (event['title'] !== undefined) {
          this.titleService.setTitle('川大物流运输联盟-' + event['title']);
        }});

  }
}
