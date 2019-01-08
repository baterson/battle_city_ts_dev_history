import Entity, { Direction } from './Entity';
import Sprite from '../Sprite';
import entityPool from '../entityPool';
import Bullet, { BULLET_SIDE } from './Bullet';

const TANK_SIDE = 35;

const deathSprites = [
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(288.25, 128.75, 16, 15.5), side: 40 },
	{ sprite: new Sprite(288.25, 128.75, 16, 15.5), side: 40 },
	{ sprite: new Sprite(288.25, 128.75, 16, 15.5), side: 40 },
	{ sprite: new Sprite(272.25, 128.75, 15.75, 14.25), side: 37 },
	{ sprite: new Sprite(272.25, 128.75, 15.75, 14.25), side: 37 },
	{ sprite: new Sprite(272.25, 128.75, 15.75, 14.25), side: 37 },
	{ sprite: new Sprite(258, 128.75, 13.75, 13.25), side: 35 },
	{ sprite: new Sprite(258, 128.75, 13.75, 13.25), side: 35 },
	{ sprite: new Sprite(258, 128.75, 13.75, 13.25), side: 35 },
];

class Tank extends Entity {
	public canShoot;

	constructor(args) {
		super({ ...args });
		this.canShoot = true;
	}

	shootUnlockCb = () => {
		this.canShoot = true;
	};

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
		entityPool.add(
			new Bullet({
				x: bulletArgs.x,
				y: bulletArgs.y,
				direction: this.direction,
				shooter: this,
				shootUnlockCb: this.shootUnlockCb,
			})
		);
	};
}

export { TANK_SIDE, deathSprites };
export default Tank;
