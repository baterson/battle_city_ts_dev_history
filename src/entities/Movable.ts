import { Direction } from '../constants';
import entityPool from '../entityPool';
import Entity from './Entity';

class Movable extends Entity {
	public prevX;
	public prevY;
	public velocity;
	public direction;
	public sprites;
	public isDeath;

	constructor(x, y, side, direction, velocity, sprites) {
		super(x, y, side);
		this.prevX = x;
		this.prevY = y;
		this.velocity = velocity;
		this.direction = direction;
		this.sprites = sprites;
		this.isDeath = false;
	}

	render() {
		const frame = this.resolveFrame();
		frame.draw(this.x, this.y, this.side);
	}

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

	resolveFrame() {
		const sprites = this.sprites[this.direction];
		let distance;
		if (this.direction === Direction.left || this.direction === Direction.right) {
			distance = this.x;
		} else {
			distance = this.y;
		}
		const index = Math.floor(distance / 2) % sprites.length;
		return sprites[index];
	}

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

export default Movable;
