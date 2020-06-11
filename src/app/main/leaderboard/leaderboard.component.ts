import { Component, OnInit } from '@angular/core';
import { leaderboardListAnimation } from './leaderboard.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaderboardService } from 'src/app/core/services/leaderboards.service';
import { Leaderboard } from 'src/app/shared/models/leaderboard.model';

@Component({
  selector: 'wm-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  animations: [leaderboardListAnimation],
})
export class LeaderboardComponent implements OnInit {
  leaderboards: Leaderboard[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private leaderboardService: LeaderboardService
  ) {}

  ngOnInit() {
    this.leaderboardService.leaderboards$.subscribe((leaderboards) => {
      this.leaderboards = leaderboards;
      this.leaderboards =
        this.leaderboards.length < 5
          ? [
              ...this.leaderboards,
              ...Array(5 - this.leaderboards.length).fill({
                id: '1',
                name: '',
                time: null,
              }),
            ]
          : this.leaderboards;
    });
  }

  play() {
    this.router.navigate(['/game']);
  }

  leaderBoards() {
    this.router.navigate(['/leaderboard']);
  }
}
