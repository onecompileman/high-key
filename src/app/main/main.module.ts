import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LandingComponent } from './landing/landing.component';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { GameComponent } from './game/game.component';
import { SuccessComponent } from './success/success.component';
import { TopScorerComponent } from './top-scorer/top-scorer.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { GameOverComponent } from './game-over/game-over.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [
    MainComponent,
    LandingComponent,
    EnterNameComponent,
    HowToPlayComponent,
    GameComponent,
    SuccessComponent,
    TopScorerComponent,
    LeaderboardComponent,
    GameOverComponent,
    ResetComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule, CoreModule],
})
export class MainModule {}
