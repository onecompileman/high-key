export class Collectible {
  p5;
  pos;
  image;
  size;
  vel;
  scale;

  constructor(p5, pos, image) {
    this.p5 = p5;
    this.pos = pos;
    this.image = image;
    this.size = [230, 220];
    this.vel = p5.createVector(-5, 0);
  }

  display() {
    this.p5.push();
    this.p5.translate(this.pos.x, this.pos.y);
    this.size = [230 * this.scale, 220 * this.scale];

    this.p5.image(this.image, 0, 0, this.size[0], this.size[1]);
    this.p5.pop();
  }

  update() {
    this.vel.x = -5 * this.scale;

    this.pos.add(this.vel);
  }

  isOutOfBounds() {
    return this.pos.x < -1000;
  }

  isCollided(target) {
    return (
      this.pos.x < target.pos.x + target.size[0] &&
      this.pos.x + this.size[0] > target.pos.x &&
      this.pos.y < target.pos.y + target.size[1] &&
      this.pos.y + this.size[1] > target.pos.y
    );
  }
}
