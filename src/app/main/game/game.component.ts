import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';

import { cloneDeep } from 'lodash';
import { Router } from '@angular/router';

import { LeaderboardService } from 'src/app/core/services/leaderboards.service';
import * as p5 from 'p5';
import { AssetsManager } from 'src/app/core/sketches/assets-manager';
import { Player } from 'src/app/core/sketches/player';
import { Obstacle } from 'src/app/core/sketches/obstacle';
import { Collectible } from 'src/app/core/sketches/collectible';
import { CollectedParticle } from 'src/app/core/sketches/collected-particle';
import { SoundManagerService } from 'src/app/core/services/sound-manager.service';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'wm-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit {
  private sketch;
  private canvas;
  private p;
  private assetsManager;
  time = 30;
  score = 0;
  baseHeight = 937;
  scale = 1;
  timeInterval: any;
  isStarted = false;
  isGameOver = false;
  leaderboards: any[] = [];
  gameLoaded: boolean;

  constructor(
    private soundManager: SoundManagerService,
    private leaderBoardService: LeaderboardService,
    private router: Router,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  get userScore() {
    return this.score;
  }

  ngOnInit() {
    this.gameLoaded = false;
    if (!localStorage.getItem('name')) {
      this.router.navigate(['/']);
    }
    this.getLeaderboards();
  }

  ngAfterViewInit() {
    this.initSketch();
    this.scale = innerHeight / this.baseHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.scale = innerHeight / this.baseHeight;
  }

  async startGame() {
    if (this.gameLoaded) {
      this.isStarted = true;
      this.timeInterval = setInterval(async () => {
        this.time -= 0.1;

        setTimeout(() => {
          document.querySelector('#time').textContent = '';
          document.querySelector('#time').textContent = formatNumber(
            this.time,
            'en-US',
            '.2-2'
          );
        });
        if (this.time <= 0) {
          this.isStarted = false;
          clearInterval(this.timeInterval);
          this.soundManager.playSoundByPath('timesUp');
          this.saveScore();
        }
      }, 150);
    }
  }

  private async saveScore() {
    if (this.score >= 5) {
      this.leaderboards.sort((a, b) => b.score - a.score);
      let rank;

      if (this.leaderboards.length === 0) {
        rank = 1;
      } else {
        const id = 'bee';
        this.leaderboards.push({
          score: this.score,
          id,
        });
        this.leaderboards.sort((a, b) => b.score - a.score);
        console.log(this.leaderboards);

        rank = this.leaderboards.findIndex((l) => l.id === id) + 1;
      }

      console.log(this.leaderboards, rank);

      if (rank <= 5) {
        const leaderboard = await this.leaderBoardService.create({
          name: localStorage.getItem('name'),
          score: this.score,
          rank,
        });

        console.log(leaderboard);
        localStorage.setItem('time', this.time.toString());
        localStorage.setItem('score', this.score.toString());
        localStorage.setItem('rank', rank.toString());
        localStorage.setItem('leaderboard-id', leaderboard.id);
        setTimeout(() => {
          this.p.remove();
          this.router.navigate(['/slide'], {
            queryParams: {
              nextPage: 'top-scorer',
            },
          });
        }, 2000);
      } else {
        const leaderboard = await this.leaderBoardService.create({
          name: localStorage.getItem('name'),
          score: this.score,
          rank,
        });
        localStorage.setItem('time', this.time.toString());
        localStorage.setItem('leaderboard-id', leaderboard.id);
        localStorage.setItem('score', this.score.toString());
        setTimeout(() => {
          this.p.remove();

          this.router.navigate(['/slide'], {
            queryParams: {
              nextPage: 'success',
            },
          });
        }, 2000);
      }
    } else {
      const leaderboard = await this.leaderBoardService.create({
        name: localStorage.getItem('name'),
        score: this.score,
      });
      localStorage.setItem('time', this.time.toString());
      localStorage.setItem('leaderboard-id', leaderboard.id);
      localStorage.setItem('score', this.score.toString());
      setTimeout(() => {
        this.p.remove();

        console.log('here');
        this.router.navigate(['/slide'], {
          queryParams: {
            nextPage: 'game-over',
          },
        });
      }, 2000);
    }
    // this.sketch.clear();
  }

  private getLeaderboards() {
    this.leaderBoardService.allLeaderboards$.subscribe(
      (leaderboards) => (this.leaderboards = leaderboards)
    );
  }

  private initSketch() {
    this.time = 30;
    this.score = 0;

    this.sketch = (s) => {
      let canvas;
      let player;
      let obstacles = [];
      let collectibles = [];
      let collectibleParticles = [];
      let activeCollectibleIndex = 0;
      s.disableFriendlyErrors = true;

      s.preload = () => {
        if (!this.assetsManager) {
          this.assetsManager = new AssetsManager(s);
          this.assetsManager.loadAllAssets();
        }
      };

      s.setup = () => {
        this.p = s;
        this.gameLoaded = true;
        canvas = s.createCanvas(innerWidth, innerHeight);
        canvas.parent('gameContainer');
        player = new Player(s, [this.assetsManager.player]);
        player.scale = this.scale;

        generateInitialObstacles();
        initializeCollectibles();
      };

      s.mousePressed = () => {
        if (this.isStarted) {
          player.jumpUp();
        }
      };

      s.draw = () => {
        s.background(255, 255, 255, 0);
        s.clear();
        player.display();
        if (this.isStarted) {
          player.update();
        }

        obstacles = obstacles.filter((o) => {
          o.display();
          o.scale = this.scale;

          if (this.isStarted) {
            o.update();

            let collided = false;

            if (o.isCollided(player) && !this.isGameOver) {
              console.log('here');
              collided = true;
              this.isGameOver = true;
              clearInterval(this.timeInterval);
              this.soundManager.playSoundByPath('wrong');
              this.isStarted = false;
              this.saveScore();
            }
          }

          return !o.isOutOfBounds();
        });

        collectibles = collectibles.filter((o) => {
          o.display();
          o.scale = this.scale;

          if (this.isStarted) {
            o.update();
          }

          let collided = false;

          if (o.isCollided(player)) {
            collided = true;
            this.soundManager.playSoundByPath('correct');
            let pos = o.pos;
            pos.x = pos.x + o.size[0] / 2;
            pos.y = pos.y + o.size[1] / 2;

            this.score++;
            setTimeout(() => {
              document.querySelector('#score').textContent = '';
              document.querySelector(
                '#score'
              ).textContent = this.score.toString();

              setTimeout(() => {
                document.querySelector('#score').textContent = '';
                document.querySelector(
                  '#score'
                ).textContent = this.score.toString();
              }, 10);
            });

            collectibleParticles.push(
              new CollectedParticle(
                s,
                pos,
                this.assetsManager.pointCollectedEffects
              )
            );
          }

          return !o.isOutOfBounds() && !collided;
        });

        collectibleParticles = collectibleParticles.filter((o) => {
          o.display();
          o.scale = this.scale;
          return !o.isOutOfBounds() && !o.isDead();
        });

        if (s.frameCount % 200 === 0 && this.isStarted) {
          generateObstacles();
        }
        if (s.frameCount % 200 === 0 && this.isStarted) {
          generateCollectible();
        }
      };

      let generateInitialObstacles = () => {
        let spaceInterval = 900 * this.scale;
        let initialX = innerWidth * 0.6;
        for (let i = 0; i < 2; i++) {
          const obstacle = s.random(this.assetsManager.obstacles1);
          const obstacleObj = cloneDeep(obstacle);
          const pos = s.createVector(
            initialX,
            s.random(['up', 'down']) === 'up'
              ? s.random(10, 100)
              : innerHeight - s.random(200, 400) * this.scale
          );

          obstacles.push(new Obstacle(s, pos, obstacleObj));

          initialX += spaceInterval;
        }
      };

      let generateObstacles = () => {
        const obstacle = s.random(this.assetsManager.obstacles1);
        const obstacleObj = cloneDeep(obstacle);
        const pos = s.createVector(
          innerWidth + 300 * this.scale,
          s.random(['up', 'down']) === 'up'
            ? s.random(10, 100)
            : innerHeight - s.random(200, 400) * this.scale
        );

        const isCollided = obstacles.some((o) =>
          o.isCollided(new Obstacle(s, pos, obstacleObj))
        );
        if (!isCollided) {
          obstacles.push(new Obstacle(s, pos, obstacleObj));
        }

        const obstacle1 = s.random(this.assetsManager.obstacles1);
        const obstacleObj1 = cloneDeep(obstacle1);
        const pos1 = s.createVector(
          innerWidth + 1200 * this.scale,
          s.random(['up', 'down']) === 'up'
            ? s.random(10, 100)
            : innerHeight - s.random(200, 400) * this.scale
        );

        const isCollided1 = obstacles.some((o) =>
          o.isCollided(new Obstacle(s, pos1, obstacleObj1))
        );
        if (!isCollided) {
          obstacles.push(new Obstacle(s, pos1, obstacleObj1));
        }
      };

      let initializeCollectibles = () => {
        let initialX = innerWidth * 0.85;
        let isCollided = false;
        let initialSize = [250 * this.scale, 220 * this.scale];
        let y;
        let iterations = 0;
        do {
          y = s.random(0, innerHeight - initialSize[1]);

          isCollided = obstacles.some((o) =>
            o.isCollided({
              pos: s.createVector(initialX, y),
              size: initialSize,
            })
          );
          iterations++;
        } while (isCollided && iterations != 20);

        collectibles.push(
          new Collectible(
            s,
            s.createVector(initialX, y),
            this.assetsManager.collectibles[0]
          )
        );
        activeCollectibleIndex =
          activeCollectibleIndex === 4 ? 0 : activeCollectibleIndex + 1;
      };

      let generateCollectible = () => {
        let initialX = innerWidth + 750 * this.scale;
        let isCollided = false;
        let initialSize = [250 * this.scale, 220 * this.scale];
        let y;

        let iterations = 0;
        do {
          y = s.random(initialSize[1], innerHeight - initialSize[1]);

          isCollided = obstacles.some((o) =>
            o.isCollided({
              pos: s.createVector(initialX, y),
              size: initialSize,
            })
          );
          iterations++;
        } while (isCollided);

        collectibles.push(
          new Collectible(
            s,
            s.createVector(initialX, y),
            this.assetsManager.collectibles[0]
          )
        );
        activeCollectibleIndex =
          activeCollectibleIndex === 4 ? 0 : activeCollectibleIndex + 1;
      };

      return {
        clear: () => s.remove(),
      };
    };

    this.canvas = new p5(this.sketch);
  }
}
