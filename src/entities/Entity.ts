import idGen from '../utils/idGen';
import entityPool from '../entityPool';
import c from '../utils/console';

enum Direction {
	top,
	bottom,
	right,
	left,
}

class Entity {
	public id;
	public x;
	public y;
	public side;
	public prevX;
	public prevY;
	protected velocity;
	protected sprites;
	public direction;
	public movable;
	public deathTimer;
	public isDeath;
	public deathSprites;

	constructor({ x, y, side, direction, velocity, sprites, deathTimer, deathSprites }) {
		this.id = idGen();
		this.x = x;
		this.y = y;
		this.side = side;
		this.prevX = x;
		this.prevY = y;
		this.velocity = velocity;
		this.direction = direction;
		this.sprites = sprites;
		this.movable = true;
		this.deathTimer = deathTimer;
		this.isDeath = false;
		this.deathSprites = deathSprites;
	}

	render() {
		if (this.isDeath && this.deathSprites.length) {
			this.deathTimer -= 1;
			const { sprite, side } = this.deathSprites[this.deathTimer];
			sprite.draw(this.x, this.y, side);
		} else {
			const frame = this.resolveFrame();
			frame.draw(this.x, this.y, this.side);
		}
	}

	update(deltaTime, level) {}

	move(deltaTime) {
		this.prevY = this.y;
		this.prevX = this.x;

		if (this.direction === Direction.top) {
			this.y -= this.velocity * deltaTime;
		} else if (this.direction === Direction.bottom) {
			this.y += this.velocity * deltaTime;
		} else if (this.direction === Direction.left) {
			this.x -= this.velocity * deltaTime;
		} else if (this.direction === Direction.right) {
			this.x += this.velocity * deltaTime;
		}
	}

	goBack() {
		this.x = this.prevX;
		this.y = this.prevY;
	}

	resolveFrame = () => {
		const sprites = this.sprites[this.direction];
		let distance;
		if (this.direction === Direction.left || this.direction === Direction.right) {
			distance = this.x;
		} else {
			distance = this.y;
		}
		const index = Math.floor(distance / 2) % sprites.length;
		return sprites[index];
	};

	destroy = () => {
		this.isDeath = true;
		entityPool.toRemove(this.id);
	};

	resolveEdgeCollision() {
		this.x = this.prevX;
		this.y = this.prevY;
	}

	// TODO: Tile types
	resolveTileCollision(tiles, level) {
		this.goBack();
	}

	getCollisionPoints() {
		if (this.direction === Direction.top) {
			return [
				{ x: this.x, y: this.y },
				{ x: this.x + this.side / 2, y: this.y },
				{ x: this.x + this.side, y: this.y },
			];
		} else if (this.direction === Direction.right) {
			return [
				{ x: this.x + this.side, y: this.y },
				{ x: this.x + this.side, y: this.y + this.side / 2 },
				{ x: this.x + this.side, y: this.y + this.side },
			];
		} else if (this.direction === Direction.bottom) {
			return [
				{ x: this.x, y: this.y + this.side },
				{ x: this.x + this.side / 2, y: this.y + this.side },
				{ x: this.x + this.side, y: this.y + this.side },
			];
		} else if (this.direction === Direction.left) {
			return [
				{ x: this.x, y: this.y },
				{ x: this.x, y: this.y + this.side / 2 },
				{ x: this.x, y: this.y + this.side },
			];
		}
	}

	get outOfScreen() {
		const [point] = this.getCollisionPoints();
		return point.x > 595 || point.x < 0 || point.y > 595 || point.y < 0;
	}
}

export { Direction };
export default Entity;
