import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaderboardService } from 'src/app/core/services/leaderboards.service';

@Component({
  selector: 'wm-top-scorer',
  templateUrl: './top-scorer.component.html',
  styleUrls: ['./top-scorer.component.scss'],
})
export class TopScorerComponent implements OnInit {
  animatedClass: string;

  time: number = 0;
  name: string;
  rank: string;
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
    this.rank = localStorage.getItem('rank');
    this.url = location.href + `?id=${leaderboardId}`;
    this.isShareMode = Boolean(leaderboardIdQuery);

    this.leaderboardService.getById(leaderboardId).subscribe((leaderboard) => {
      console.log(leaderboard);
      this.time = leaderboard.time;
      this.name = leaderboard.name;
      this.rank = leaderboard.rank.toString();
    });
  }

  play() {
    this.router.navigate(['/game']);
  }

  leaderBoards() {
    this.router.navigate(['/leaderboard']);
  }
}
