import {
	Direction,
	BULLET_SIDE,
	TANK_SIDE,
	TANK_DEATH_TIMER,
	TANK_SPAWN_TIMER,
	TANK_SPAWN_SPRITES,
	TANK_DEATH_SPRITES,
} from '../constants';
import Entity from './Entity';
import Bullet from './Bullet';
import timer from '../timer';
import pool from '../gameObjectPool';

class Tank extends Entity {
	public canShoot;
	public isDeath;
	public isSpawning;
	public deathTimer;
	public spawnTimer;

	constructor(x, y, direction, velocity, sprites) {
		super(x, y, TANK_SIDE, direction, velocity, sprites);
		this.canShoot = true;
		this.isDeath = false;
		this.isSpawning = true;
		this.deathTimer = TANK_DEATH_TIMER;
		this.spawnTimer = TANK_SPAWN_TIMER;
		timer.set(TANK_SPAWN_TIMER, () => (this.isSpawning = false));
	}

	update(deltaTime, level) {
		if (this.isSpawning) {
			this.spawnTimer -= 1;
		} else if (this.isDeath) {
			this.deathTimer -= 1;
		}
	}

	render() {
		if (this.isSpawning) {
			const { sprite, side } = TANK_SPAWN_SPRITES[this.spawnTimer];
			sprite.draw(this.x, this.y, side);
		} else if (this.isDeath) {
			const { sprite, side } = TANK_DEATH_SPRITES[this.deathTimer];
			sprite.draw(this.x, this.y, side);
		} else {
			const frame = this.resolveFrame();
			frame.draw(this.x, this.y, this.side);
		}
	}

	shot = () => {
		if (!this.canShoot) return;

		this.canShoot = false;
		let bulletArgs;

		if (this.direction === Direction.top) {
			bulletArgs = { x: this.x + this.side / 2 - BULLET_SIDE / 2, y: this.y - BULLET_SIDE };
		} else if (this.direction === Direction.right) {
			bulletArgs = { x: this.x + this.side, y: this.y + this.side / 2 - BULLET_SIDE / 2 };
		} else if (this.direction === Direction.bottom) {
			bulletArgs = { x: this.x + this.side / 2 - BULLET_SIDE / 2, y: this.y + this.side };
		} else {
			bulletArgs = { x: this.x - BULLET_SIDE, y: this.y + this.side / 2 - BULLET_SIDE / 2 };
		}
		pool.add(new Bullet(bulletArgs.x, bulletArgs.y, this.direction, this));
		timer.set(50, () => (this.canShoot = true));
	};
}

export default Tank;
