import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaderboardService } from 'src/app/core/services/leaderboards.service';

@Component({
  selector: 'wm-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
})
export class GameOverComponent implements OnInit {
  matches: number;
  name: string;

  url: string;

  isShareMode: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private leaderboardService: LeaderboardService
  ) {}

  ngOnInit() {
    const leaderboardId = localStorage.getItem('leaderboard-id');
    const leaderboardIdQuery = this.route.snapshot.queryParams.id;
    if (!leaderboardId) {
      this.router.navigate(['/']);
    }
    this.matches = +localStorage.getItem('match');
    this.name = localStorage.getItem('name');
    this.url = location.origin + location.pathname + `?id=${leaderboardId}`;
    this.isShareMode = Boolean(leaderboardIdQuery);

    this.leaderboardService.getById(leaderboardId).subscribe((leaderboard) => {
      this.matches = leaderboard.match;
      this.name = leaderboard.name;
    });
  }

  play() {
    this.router.navigate(['/game']);
  }

  leaderBoards() {
    this.router.navigate(['/leaderboard']);
  }
}
