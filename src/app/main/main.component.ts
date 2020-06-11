import { Component, OnInit, HostListener } from '@angular/core';
import { mainRoutingAnimation } from './main-routing.animation';
import { RouterOutlet } from '@angular/router';
import { LeaderboardService } from '../core/services/leaderboards.service';

@Component({
  selector: 'wm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [mainRoutingAnimation],
})
export class MainComponent implements OnInit {
  isPortrait: boolean;

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    this.isPortrait = innerHeight > innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isPortrait = innerHeight > innerWidth;
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
