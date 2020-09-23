import { Images } from './data/images.data';
import { cloneDeep } from 'lodash';

export class AssetsManager {
  playerSprites: any[];
  player: any;
  collectibles: any[];
  pointCollectedEffects: any[];
  obstacles: any;
  obstacles1: any;
  backgroundImage: any;
  p5: any;

  constructor(p5) {
    this.p5 = p5;
  }

  loadAllAssets() {
    // this.playerSprites = Array(25)
    //   .fill(1)
    //   .map((n, i) =>
    //     this.p5.loadImage(`/assets/images/playerSprites/1 (${i + 1}).png`)
    //   );
    // this.backgroundImage = this.p5.loadImage(`/assets/images/parallax-bg.jpg`);
    this.player = this.p5.loadImage(`/assets/images/player.png`);
    this.collectibles = Array(1)
      .fill(1)
      .map((n, i) =>
        this.p5.loadImage(`/assets/images/collectibles/${i + 1}.png`)
      );
    this.pointCollectedEffects = Array(5)
      .fill(1)
      .map((n, i) =>
        this.p5.loadImage(`/assets/images/point-collected/${i + 1}.png`)
      );
    this.obstacles1 = ['carbo', 'fat', 'protein'].map((obstacle) => {
      return this.p5.loadImage(`assets/images/obstacles/${obstacle}.png`);
    });

    // this.obstacles = Object.keys(cloneDeep(Images)).reduce((acc, key) => {
    //   acc[key].image = this.p5.loadImage(acc[key].path);

    //   return acc;
    // }, cloneDeep(Images));
  }
}
