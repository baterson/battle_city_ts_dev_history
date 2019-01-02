import Entity from './Entity';
import { Directon } from './Entity';
import keyboard, { KeyState } from './keyboard';
import { rigid } from './utils/createTileSprites';
import tileMap from './tileMap';
import c from './utils/console';
import entityPool from './entityPool';
import bullet, { BULLET_SIZE } from './entities/bullet';
import rangeIntersect from './utils/rangeIntersect';

class Enemy extends Entity {
	private canShot: boolean;
	private prevTile: any;

	constructor(x, y, width, height, direction, velocity, sprites) {
		super(x, y, width, height, direction, velocity, sprites);
		this.prevTile = { x: 0, y: 0 };
	}

	update = deltaTime => {
		this.move(deltaTime);
		this.checkBorderCollision();
		this.checkTileCollision();
		this.prevY = this.y;
		this.prevX = this.x;
	};

	_render = () => {
		const frame = this.resolveFrame();
		frame.draw(this.x, this.y, this.width, this.height);
	};

	checkBorderCollision = () => {
		const box = this.getBoundingBox();
		if (box.first.x > 599 || box.first.x < 0 || box.first.y > 599 || box.first.y < 0) {
			this.x = this.prevX;
			this.y = this.prevY;
			this.direction = this.getRandomDirection();
		}
	};

	getRandomDirection = () => {
		const items = [Directon.top, Directon.right, Directon.bottom, Directon.left];
		const index = Math.floor(Math.random() * items.length);
		return items[index];
	};

	getBoundingBox = () => {
		// TODO: move width and height to appropriate keys
		if (this.direction === Directon.top) {
			const second = { x: this.x + this.width, y: this.y - 3, width: -this.width, height: 3 };
			return {
				first: { x: this.x, y: this.y - 3, width: this.width, height: 3 },
				second,
			};
		} else if (this.direction === Directon.right) {
			const second = { x: this.x + this.width, y: this.y + this.height, width: -3, height: this.height };
			return {
				first: { x: this.x + this.width, y: this.y, width: 3, height: this.height },
				second,
			};
		} else if (this.direction === Directon.bottom) {
			const second = { x: this.x + this.width, y: this.y + this.height + 3, width: -this.width, height: 3 };
			return { first: { x: this.x, y: this.y + this.width + 3, width: this.width, height: 3 }, second };
		} else if (this.direction === Directon.left) {
			const second = { x: this.x - 3, y: this.y + this.width, width: 3, height: this.width };
			return { first: { x: this.x - 3, y: this.y, width: 3, height: this.width }, second };
		}
	};

	checkTileCollision = () => {
		const { first, second } = this.getBoundingBox();
		const tile1 = tileMap.lookup(first.x, first.y);
		const tile2 = tileMap.lookup(second.x, second.y);
		let hasCollision = false;
		c.c('Tiles:  ', tile1, tile2, '\n', first, second);

		if (this.direction === Directon.right || this.direction === Directon.left) {
			if (tile1.type === 0 && tile2.type === 1) {
				if (first.y - tile1.y < 8) {
					this.y = tile1.y;
					return;
				}
			}
			if (tile1.type === 1 && tile2.type === 0) {
				if (tile1.y + 40 - first.y < 8) {
					this.y = tile2.y;
					return;
				}
			}
		} else if (this.direction === Directon.top || this.direction === Directon.bottom) {
			if (tile1.type === 0 && tile2.type === 1) {
				if (first.x - tile1.x < 8) {
					this.x = tile1.x;
					return;
				}
			}
			if (tile1.type === 1 && tile2.type === 0) {
				if (tile2.x - first.x < 8) {
					this.x = tile2.x;
					return;
				}
			}
		}

		if (tile1.type === 1) {
			const x = rangeIntersect(first.x, first.x + first.width, tile1.x, tile1.x + 40);
			const y = rangeIntersect(first.y, first.y + first.height, tile1.y, tile1.y + 40);
			if (x && y) hasCollision = true;
		}
		if (tile2.type === 1) {
			const x = rangeIntersect(second.x, second.x + second.width, tile2.x, tile2.x + 40);
			const y = rangeIntersect(second.y, second.y + second.height, tile2.y, tile2.y + 40);
			if (x && y) hasCollision = true;
		}

		if (hasCollision) {
			this.x = this.prevX;
			this.y = this.prevY;
			this.direction = this.getRandomDirection();
		}

		if (
			Math.abs(Math.floor(this.prevTile.x - tile1.x)) === 120 ||
			Math.abs(Math.floor(this.prevTile.y - tile1.y)) === 120
		) {
			this.prevTile = { x: tile1.x, y: tile1.y };
			this.direction = this.getRandomDirection();
			// TODO: Coin
			if (Math.round(Math.random()) === 1) this.shot();
		}
	};

	shot = () => {
		entityPool.add(bullet(this.x + BULLET_SIZE.width, this.y, this.direction));
	};
}

export default Enemy;
