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
  noOfJumps = 2;

  constructor(p5, sprites) {
    this.p5 = p5;
    this.sprites = sprites;
    this.originalSize = [320, 320];
    this.size = [...this.originalSize];
    this.vel = p5.createVector(0, 0);
    this.pos = p5.createVector(
      this.p5.width * 0.1,
      this.p5.height * 0.95 - 280
    );
    this.gravity = p5.createVector(0, 0.3);
  }

  display() {
    this.p5.push();
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.image(
      this.sprites[this.activeFrameIndex],
      0,
      0,
      320 * this.scale,
      320 * this.scale
    );
    this.p5.pop();
    console.log(this.vel.mag());

    if (this.vel.mag() <= 0.05 && this.p5.frameCount % 2 === 0) {
      this.activeFrameIndex++;
    }
    this.activeFrameIndex =
      this.activeFrameIndex === 15 ? 0 : this.activeFrameIndex;
    this.size = [320 * this.scale, 320 * this.scale];
  }

  update() {
    this.gravity.y = 0.2 * this.scale;
    this.applyGravity();
    this.vel.limit(10 * this.scale);

    this.pos.add(this.vel);

    this.pos.y = this.p5.constrain(
      this.pos.y,
      0,
      innerHeight * 0.9 - this.size[1]
    );

    if (this.pos.y === 0 || this.pos.y >= innerHeight * 0.9 - this.size[1]) {
      this.vel.mult(0);
      this.noOfJumps = 2;
    }
  }

  jumpUp() {
    if (this.vel.mag() <= 0.05 || this.noOfJumps > 0) {
      this.noOfJumps--;
      this.vel.add(this.p5.createVector(0, -125.5 * this.scale));
    }
  }

  applyGravity() {
    this.vel.add(this.gravity);
  }
}
