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
    this.size = [obstacleObj.collision.w, obstacleObj.collision.h];
    this.vel = this.p5.createVector(-5, 0);
  }

  display() {
    this.p5.push();
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.image(
      this.obstacleObj.image,
      0,
      0,
      this.obstacleObj.originalSize[0] * this.scale,
      this.obstacleObj.originalSize[1] * this.scale
    );
    this.p5.pop();
  }

  update() {
    this.vel.x = -this.obstacleObj.speed * this.scale;
    this.size = [
      this.obstacleObj.collision.w * this.scale,
      this.obstacleObj.collision.h * this.scale,
    ];
    this.pos.add(this.vel);
  }

  isOutOfBounds() {
    return this.pos.x < -1000;
  }

  isCollided(target) {
    return (
      this.pos.x + this.obstacleObj.collision.x * this.scale <
        target.pos.x + target.size[0] / 2 &&
      this.pos.x + this.obstacleObj.collision.x * this.scale + this.size[0] >
        target.pos.x + 100 * this.scale &&
      this.pos.y + this.obstacleObj.collision.y * this.scale <
        target.pos.y + 60 * this.scale + target.size[1] - 60 * this.scale &&
      this.pos.y + this.obstacleObj.collision.y * this.scale + this.size[1] >
        target.pos.y + 60 * this.scale
    );
  }
}
