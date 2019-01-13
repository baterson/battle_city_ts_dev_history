import { Direction, TANK_VELOCITY, TANK_LIVES, TANK_SPRITES } from '../constants';
import Tank from './Tank';
import Bullet from './Bullet';
import Player from './Player';

class Enemy extends Tank {
	public prevTile: any;
	public type;
	public lives;

	constructor(x, y, direction, type) {
		super(x, y, direction, TANK_VELOCITY[type], TANK_SPRITES[type]);
		this.prevTile = { x: 0, y: 0 };
		this.type = type;
		this.lives = TANK_LIVES[type];
	}

	update(deltaTime, level) {
		super.update(deltaTime, level);
		if (this.isDeath || this.isSpawning) return;
		this.move(deltaTime);
	}

	setRandomDirection() {
		const items = [Direction.top, Direction.right, Direction.bottom, Direction.left].filter(
			direction => direction !== this.direction
		);
		const index = Math.floor(Math.random() * items.length);
		this.direction = items[index];
	}

	setOpositeDirection() {
		if (this.direction === Direction.top) {
			this.direction = Direction.bottom;
		} else if (this.direction === Direction.bottom) {
			this.direction = Direction.top;
		} else if (this.direction === Direction.right) {
			this.direction = Direction.left;
		} else {
			this.direction = Direction.right;
		}
	}

	move(deltaTime) {
		if (
			Math.abs(Math.floor(this.prevTile.x - this.x)) > 120 ||
			Math.abs(Math.floor(this.prevTile.y - this.y)) > 120
		) {
			this.prevTile = { x: this.x, y: this.y };
			this.shot();
			this.setRandomDirection();
		} else {
			super.move(deltaTime);
		}
	}

	resolveEdgeCollision() {
		super.resolveEdgeCollision();
		this.setRandomDirection();
	}

	// TODO: Tile types
	resolveTileCollision(tiles, level) {
		this.goBack();
		if (!this.canShoot) {
			this.setOpositeDirection();
		} else {
			this.shot();
		}
	}

	resolveEntityCollision(other, level, initiator) {
		if (other instanceof Bullet && other.shooter instanceof Player) {
			if (this.lives === 1) {
				this.destroy();
			} else {
				this.lives -= 1;
				this.sprites = TANK_SPRITES[`${this.type}${this.lives}`];
			}
		} else if (other instanceof Enemy && initiator.id === this.id) {
			this.goBack();
			this.setOpositeDirection();
		} else if (other instanceof Player) {
			this.goBack();
			this.shot();
		}
	}
}

export default Enemy;
