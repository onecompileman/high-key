import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wm-top-scorer',
  templateUrl: './top-scorer.component.html',
  styleUrls: ['./top-scorer.component.scss'],
})
export class TopScorerComponent implements OnInit {
  animatedClass: string;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.animatedClass = 'animate__animated animate__rubberBand';
    }, 1000);
  }
}
