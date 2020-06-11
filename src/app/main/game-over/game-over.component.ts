import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.matches = this.route.snapshot.queryParams.match;
    this.name =
      this.route.snapshot.queryParams.name || localStorage.getItem('name');
    this.url =
      location.origin +
      location.pathname +
      `?match=${this.matches}&name=${this.name}`;
    this.isShareMode = Boolean(this.route.snapshot.queryParams.name);
  }

  play() {
    this.router.navigate(['/game']);
  }

  leaderBoards() {
    this.router.navigate(['/leaderboard']);
  }
}
