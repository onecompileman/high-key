import { Component, OnInit } from '@angular/core';
import { mainRoutingAnimation } from './main-routing.animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'wm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [mainRoutingAnimation],
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  prepareRoute(outlet: RouterOutlet) {
    console.log(outlet);
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
