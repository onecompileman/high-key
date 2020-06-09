import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wm-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  animatedClass: string;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.animatedClass = 'animate__animated animate__rubberBand';
    }, 1000);
  }
}
