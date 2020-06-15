import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from 'src/app/core/services/leaderboards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wm-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  constructor(
    private leaderboardService: LeaderboardService,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.askForPassword();
    }, 2000);
  }

  private askForPassword() {
    const password = prompt('Please enter the password');

    if (password === 'beehive2020') {
      this.leaderboardService.deleteAll().subscribe(() => {
        alert('Deleted all leaderboard records');
        this.router.navigate(['/']);
      });
    } else {
      if (confirm('wrong password!, enter the password again?')) {
        this.askForPassword();
      } else {
        this.router.navigate(['/']);
      }
    }
  }
}
