import { Component, OnInit } from '@angular/core';
import { Tile } from 'src/app/shared/models/tile.model';

import { cloneDeep } from 'lodash';
import { shuffle } from 'src/app/core/utils/shuffle.util';
import { interval } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Howl, Howler } from 'howler';
import { LeaderboardService } from 'src/app/core/services/leaderboards.service';
import { Leaderboard } from 'src/app/shared/models/leaderboard.model';

@Component({
  selector: 'wm-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  tiles: Tile[] = [];
  distractionTiles: Tile[] = [];
  neededTiles: Tile[] = [];
  row1: Tile[] = [];
  row2: Tile[] = [];
  row3: Tile[] = [];

  time: number = 0;

  tile1: Tile;
  tile2: Tile;

  tilesMatch: number = 0;

  leaderboards: Leaderboard[] = [];

  constructor(
    private router: Router,
    private leaderboardService: LeaderboardService
  ) {}

  ngOnInit() {
    this.time = 0;
    this.initTiles();
    this.tilesMatch = 0;
    setTimeout(() => {
      this.startTimeInterval();
    }, 2500);
  }

  addClassDelay(element, classes: string[], delay: number) {
    setTimeout(() => {
      element.classList.add(classes);
    }, delay);
  }

  openTile(tile: Tile) {
    if (!this.tile2) {
      tile.opened = true;

      if (!this.tile1) {
        this.tile1 = tile;
      } else {
        this.tile2 = tile;
        if (this.tile1.imagePath === tile.imagePath) {
          this.tile1.opened = true;
          tile.isEffects = tile.matched = this.tile1.matched = true;
          this.tile1 = this.tile2 = null;

          const matchTile = this.neededTiles.find(
            (t) => t.imagePath === tile.imagePath
          );
          matchTile.matched = true;

          this.tilesMatch++;
          const sound = new Howl({
            src: ['/assets/sounds/match.wav'],
          });

          sound.play();

          if (this.tilesMatch >= 5) {
            setTimeout(() => {
              this.router.navigate(['/success'], {
                queryParams: { time: this.time },
              });
            }, 2500);
          }
        } else {
          // const sound = new Howl({
          //   src: ['/assets/sounds/no-match.wav'],
          // });

          setTimeout(() => {
            this.tile1.opened = tile.opened = false;
            this.tile1 = this.tile2 = null;
          }, 300);
        }
      }
    }
  }

  private initTiles() {
    this.distractionTiles = Array(10)
      .fill(1)
      .map((n, i) => ({
        imagePath: `/assets/images/game-icons/d${i + 1}.png`,
        index: i,
        opened: false,
        matched: false,
        isLandscape: i + 1 >= 8,
        isEffects: false,
      }));

    this.neededTiles = Array(5)
      .fill(1)
      .map((n, i) => ({
        imagePath: `/assets/images/game-icons/${i + 1}.png`,
        index: i,
        opened: false,
        matched: false,
        isLandscape: false,
        isEffects: false,
      }));

    this.tiles = [
      ...cloneDeep(this.neededTiles),
      ...cloneDeep(this.neededTiles),
      ...cloneDeep(this.distractionTiles),
    ];

    this.tiles = shuffle(this.tiles).map((tile, index) => ({ ...tile, index }));
    this.row1 = this.tiles.slice(0, 7);
    this.row2 = this.tiles.slice(7, 13);
    console.log(this.row2);
    this.row3 = this.tiles.slice(13, 20);
  }

  private startTimeInterval() {
    interval(10)
      .pipe(filter(() => this.time < 30 && this.tilesMatch < 5))
      .subscribe(() => {
        this.time += 0.01;

        if (this.time >= 30) {
          const sound = new Howl({
            src: ['/assets/sounds/timesup.mp3'],
          });

          sound.play();

          this.tiles = this.tiles.map((tile) => ({
            opened: true,
            ...tile,
          }));
          setTimeout(() => {
            this.router.navigate(['/game-over'], {
              queryParams: { match: this.tilesMatch },
            });
          }, 2500);
        }
      });
  }
}
