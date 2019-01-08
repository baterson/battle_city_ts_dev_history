import Tank, { TANK_SIDE, deathSprites } from './Tank';
import Sprite from '../Sprite';
import { Direction } from './Entity';
import { Tiles } from '../TileMap';
import Bullet from './Bullet';
import Player from './Player';

enum TankTypes {
	default,
	fast,
	armored,
}

const sprites = {
	[TankTypes.default]: {
		[Direction.top]: [new Sprite(128, 0, 16, 15), new Sprite(144, 0, 16, 15)],
		[Direction.bottom]: [new Sprite(192, 0, 16, 15), new Sprite(208, 0, 16, 15)],
		[Direction.right]: [new Sprite(224, 0, 16, 15), new Sprite(240, 0, 16, 15)],
		[Direction.left]: [new Sprite(160, 0, 16, 15), new Sprite(176, 0, 16, 15)],
	},
	[TankTypes.fast]: {
		[Direction.top]: [new Sprite(128, 80, 16, 15), new Sprite(144, 80, 16, 15)],
		[Direction.bottom]: [new Sprite(192, 80, 16, 15), new Sprite(208, 80, 16, 15)],
		[Direction.right]: [new Sprite(224, 80, 16, 15), new Sprite(240, 80, 16, 15)],
		[Direction.left]: [new Sprite(160, 80, 16, 15), new Sprite(176, 80, 16, 15)],
	},
	[TankTypes.armored]: {
		// TODO: Adjust sprites
		[Direction.top]: [new Sprite(128.5, 111.75, 14.75, 16), new Sprite(144.25, 111.75, 14.75, 16)],
		[Direction.bottom]: [new Sprite(191.75, 111.75, 15.25, 16), new Sprite(207.5, 111.75, 15.25, 16)],
		[Direction.right]: [new Sprite(222.75, 111.75, 16, 16), new Sprite(239, 111.75, 14.75, 16)],
		[Direction.left]: [new Sprite(159, 111.75, 16, 16), new Sprite(174.75, 111.75, 16, 16)],
	},
};

const velocityMap = {
	[TankTypes.default]: 160,
	[TankTypes.fast]: 200,
	[TankTypes.armored]: 120,
};

class Enemy extends Tank {
	private prevTile: any;
	public type;

	constructor({ x, y, side = TANK_SIDE, direction, type }) {
		super({
			x,
			y,
			side,
			direction,
			velocity: velocityMap[type],
			sprites: sprites[type],
			deathTimer: deathSprites.length,
			deathSprites: deathSprites,
		});
		this.prevTile = { x: 0, y: 0 };
		this.type = type;
	}

	update(deltaTime, level) {
		if (this.isDeath) return;
		this.move(deltaTime);
	}

	setRandomDirection = () => {
		const items = [Direction.top, Direction.right, Direction.bottom, Direction.left].filter(
			direction => direction !== this.direction
		);
		const index = Math.floor(Math.random() * items.length);
		this.direction = items[index];
	};

	move(deltaTime) {
		if (
			Math.abs(Math.floor(this.prevTile.x - this.x)) > 120 ||
			Math.abs(Math.floor(this.prevTile.y - this.y)) > 120
		) {
			this.prevTile = { x: this.x, y: this.y };
			this.shot();
			this.setRandomDirection();
			// if (Math.round(Math.random()) === 1) this.shot(level);
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
		this.setRandomDirection();
	}

	resolveEntityCollision(other, level) {
		if (other instanceof Bullet && other.shooter instanceof Player) {
			this.destroy();
		} else if (other instanceof Enemy || other instanceof Player) {
			this.x = this.prevX;
			this.y = this.prevY;
			this.setRandomDirection();
		}
	}
}

export { TankTypes };
export default Enemy;
