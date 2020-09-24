export class Player {
  p5: any;
  sprites: any[];
  originalSize: number[];
  size: number[];
  activeFrameIndex = 0;
  vel: any;
  pos: any;
  gravity: any;
  scale;

  constructor(p5, sprites) {
    this.p5 = p5;
    this.sprites = sprites;
    this.originalSize = [262, 200];
    this.size = [...this.originalSize];
    this.vel = p5.createVector(0, 0);
    this.pos = p5.createVector(this.p5.width * 0.1, this.p5.height / 2);
    this.gravity = p5.createVector(0, 0.3);
  }

  display() {
    this.p5.push();
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.image(this.sprites[0], 0, 0, 262 * this.scale, 200 * this.scale);
    this.p5.pop();

    // if (this.p5.frameCount % 2 === 0) {
    // 	this.activeFrameIndex++;
    // }
    // this.activeFrameIndex = this.activeFrameIndex === 25 ? 0 : this.activeFrameIndex;
    this.size = [200 * this.scale, 190 * this.scale];
  }

  update() {
    this.gravity.y = 0.33 * this.scale;
    this.applyGravity();
    this.vel.limit(9 * this.scale);

    this.pos.add(this.vel);

    this.pos.y = this.p5.constrain(this.pos.y, 0, innerHeight - this.size[1]);

    if (this.pos.y === 0 || this.pos.y >= innerHeight - this.size[1]) {
      this.vel.mult(0);
    }
  }

  jumpUp() {
    this.vel.add(this.p5.createVector(0, -7.5 * this.scale));
  }

  applyGravity() {
    this.vel.add(this.gravity);
  }
}
