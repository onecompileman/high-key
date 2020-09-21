export class CollectedParticle {
	p5;
	pos;
	sprites;
	size;
	vel;
	activeFrame = 0;
	scale;

	constructor(p5, pos, sprites) {
		this.p5 = p5;
		this.pos = pos;
		this.sprites = sprites;
		this.size = [ 296, 337 ];
		this.vel = p5.createVector(-5, 0);
	}

	display() {
		this.p5.push();
		this.p5.translate(this.pos.x, this.pos.y);
		this.p5.imageMode(this.p5.CENTER);
		this.p5.image(
			this.sprites[this.activeFrame],
			0,
			0,
			this.sprites[this.activeFrame].width / 2 * this.scale,
			this.sprites[this.activeFrame].height / 2 * this.scale
		);
		this.p5.pop();
		this.vel.x = -5 * this.scale;
		this.pos.add(this.vel);

		if (this.p5.frameCount % 3 === 0) {
			this.activeFrame++;
		}

		this.activeFrame = this.p5.constrain(this.activeFrame, 0, 4);
	}

	isOutOfBounds() {
		return this.pos.x < -1000;
	}

	isDead() {
		return this.activeFrame === 4;
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
