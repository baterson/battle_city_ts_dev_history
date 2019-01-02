import Entity from './Entity';
import { Directon } from './Entity';
import keyboard, { KeyState } from './keyboard';
import { rigid } from './utils/createTileSprites';
import tileMap from './tileMap';
import c from './utils/console';
import entityPool from './entityPool';
import bullet, { BULLET_SIZE } from './entities/bullet';
import rangeIntersect from './utils/rangeIntersect';

class Player extends Entity {
	private canShot: boolean;
	update = deltaTime => {
		this.processInput(deltaTime);
		this.checkCollision();
	};

	checkCollision = () => {
		this.checkBorderCollision();
		this.checkTileCollision();
	};

	_render = () => {
		const frame = this.resolveFrame();
		frame.draw(this.x, this.y, this.width, this.height);
	};

	checkBorderCollision = () => {
		const box = this.getBoundingBox();
		if (box.first.x > 600 || box.first.x < 0 || box.first.y > 600 || box.first.y < 0) {
			this.x = this.prevX;
			this.y = this.prevY;
		}
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
		// Forgivnes
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
		//

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
		}
	};

	processInput = deltaTime => {
		this.prevY = this.y;
		this.prevX = this.x;
		const { keyStates } = keyboard;

		if (keyStates.ArrowUp === KeyState.pressed) {
			this.direction = Directon.top;
			this.move(deltaTime);
		} else if (keyStates.ArrowDown === KeyState.pressed) {
			this.direction = Directon.bottom;
			this.move(deltaTime);
		} else if (keyStates.ArrowLeft === KeyState.pressed) {
			this.direction = Directon.left;
			this.move(deltaTime);
		} else if (keyStates.ArrowRight === KeyState.pressed) {
			this.direction = Directon.right;
			this.move(deltaTime);
		} else if (keyStates.Space === KeyState.pressed) {
			if (this.canShot) {
				this.shot();
			}
			this.canShot = false;
		} else if (keyStates.Space === KeyState.released) {
			this.canShot = true;
		}
	};

	shot = () => {
		entityPool.add(bullet(this.x + BULLET_SIZE.width, this.y, this.direction));
	};
}

export default Player;
