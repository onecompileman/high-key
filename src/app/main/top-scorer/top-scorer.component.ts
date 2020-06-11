import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    setTimeout(() => {
      this.animatedClass = 'animate__animated animate__rubberBand';
    }, 1000);

    this.time = this.route.snapshot.queryParams.time;
    this.name =
      this.route.snapshot.queryParams.name || localStorage.getItem('name');
    this.rank = this.route.snapshot.queryParams.rank;
    this.url =
      location.origin +
      location.pathname +
      `?time=${this.time}&name=${this.name}`;
    this.isShareMode = Boolean(this.route.snapshot.queryParams.name);
  }

  play() {
    this.router.navigate(['/game']);
  }

  leaderBoards() {
    this.router.navigate(['/leaderboard']);
  }
}
