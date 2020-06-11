import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wm-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss'],
})
export class EnterNameComponent implements OnInit {
  name: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  next() {
    if (this.name.length > 0) {
      localStorage.setItem('name', this.name);
      this.router.navigate(['/how-to-play']);
    }
  }
}
