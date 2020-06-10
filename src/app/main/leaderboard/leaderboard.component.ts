import { Component, OnInit } from '@angular/core';
import { leaderboardListAnimation } from './leaderboard.animation';

@Component({
  selector: 'wm-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  animations: [leaderboardListAnimation],
})
export class LeaderboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
