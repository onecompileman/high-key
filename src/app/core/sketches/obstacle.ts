export class Obstacle {
  p5;
  pos;
  vel;
  obstacleObj;
  size;
  scale;

  constructor(p5, pos, obstacleObj) {
    this.p5 = p5;
    this.pos = pos;
    this.obstacleObj = obstacleObj;
    this.size = [220, 220];
    this.vel = this.p5.createVector(-5, 0);
  }

  display() {
    this.p5.push();
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.image(this.obstacleObj, 0, 0, 220 * this.scale, 220 * this.scale);
    this.p5.pop();
  }

  update() {
    this.vel.x = -5 * this.scale;
    this.size = [140 * this.scale, 140 * this.scale];
    this.pos.add(this.vel);
  }

  isOutOfBounds() {
    return this.pos.x < -1000;
  }

  isCollided(target) {
    return this.pos.dist(target.pos) < this.size[0] / 2 + target.size[0] / 2;
  }
}
