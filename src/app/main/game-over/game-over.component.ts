import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wm-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
})
export class GameOverComponent implements OnInit {
  matches: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.matches = this.route.snapshot.queryParams.match;
  }

  play() {
    this.router.navigate(['/game']);
  }

  leaderBoards() {
    this.router.navigate(['/leaderboard']);
  }
}
