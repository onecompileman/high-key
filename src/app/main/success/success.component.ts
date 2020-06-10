import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wm-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  animatedClass: string;

  time: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    setTimeout(() => {
      this.animatedClass = 'animate__animated animate__rubberBand';
    }, 1000);

    this.time = this.route.snapshot.queryParams.time;
  }

  play() {
    this.router.navigate(['/game']);
  }

  leaderBoards() {
    this.router.navigate(['/leaderboard']);
  }
}
