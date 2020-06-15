import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaderboardService } from 'src/app/core/services/leaderboards.service';

@Component({
  selector: 'wm-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  animatedClass: string;

  time: number = 0;
  name: string;
  url: string;

  isShareMode: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private leaderboardService: LeaderboardService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.animatedClass = 'animate__animated animate__rubberBand';
    }, 1000);

    const leaderboardId = localStorage.getItem('leaderboard-id');
    const leaderboardIdQuery = this.route.snapshot.queryParams.id;
    if (!leaderboardId) {
      this.router.navigate(['/']);
    }

    this.time = +localStorage.getItem('time');
    this.name = localStorage.getItem('name');
    this.url = location.origin + location.pathname + `?id=${leaderboardId}`;
    this.isShareMode = Boolean(leaderboardIdQuery);

    this.leaderboardService.getById(leaderboardId).subscribe((leaderboard) => {
      this.time = leaderboard.time;
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
