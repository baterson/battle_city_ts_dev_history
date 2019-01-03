import idGen from '../utils/idGen';
import entityPool from '../entityPool';
import { Tiles, solid } from '../tileMap';
import c from '../utils/console';

enum Directon {
	top,
	bottom,
	right,
	left,
}

class Entity {
	public id;
	public x;
	public y;
	public prevX;
	public prevY;
	protected velocity;
	protected sprites;
	public side;
	public direction;

	constructor(x, y, side, direction, velocity, sprites) {
		this.id = idGen();
		this.x = x;
		this.y = y;
		this.prevX = x;
		this.prevY = y;
		this.velocity = velocity;
		this.sprites = sprites;
		this.side = side;
		this.direction = direction;
	}

	render = () => {
		const frame = this.resolveFrame();
		frame.draw(this.x, this.y, this.side);
	};

	move(deltaTime) {
		this.prevY = this.y;
		this.prevX = this.x;

		if (this.direction === Directon.top) {
			this.y -= this.velocity * deltaTime;
		} else if (this.direction === Directon.bottom) {
			this.y += this.velocity * deltaTime;
		} else if (this.direction === Directon.left) {
			this.x -= this.velocity * deltaTime;
		} else if (this.direction === Directon.right) {
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
		if (this.direction === Directon.left || this.direction === Directon.right) {
			distance = this.x;
		} else {
			distance = this.y;
		}
		const index = Math.floor(distance / 2) % sprites.length;
		return sprites[index];
	};

	destroy = () => {
		entityPool.toRemove(this.id);
	};

	resolveEdgeCollision() {
		this.x = this.prevX;
		this.y = this.prevY;
	}

	// TODO: Tile types
	resolveTileCollision(tile1, tile2) {
		c.c(tile1, tile2);
		this.goBack();
	}
	// resolveTileCollision(tile1, tile2) {
	// 	if (tile1.type === Tiles.none || tile2.type === Tiles.none) {
	// 		this.helpNavigate(tile1, tile2);
	// 	} else {
	// 		this.x = this.prevX;
	// 		this.y = this.prevY;
	// 	}
	// }

	getCollisionPoints() {
		if (this.direction === Directon.top) {
			return [{ x: this.x, y: this.y }, { x: this.x + this.side, y: this.y }];
		} else if (this.direction === Directon.right) {
			return [{ x: this.x + this.side, y: this.y }, { x: this.x + this.side, y: this.y + this.side }];
		} else if (this.direction === Directon.bottom) {
			return [{ x: this.x, y: this.y + this.side }, { x: this.x + this.side, y: this.y + this.side }];
		} else if (this.direction === Directon.left) {
			return [{ x: this.x, y: this.y }, { x: this.x, y: this.y + this.side }];
		}
	}

	// getCollisionPoints() {
	// 	if (this.direction === Directon.top) {
	// 		return [
	// 			{ x: this.x, y: this.y },
	// 			{ x: this.x + this.side / 2, y: this.y },
	// 			{ x: this.x + this.side, y: this.y },
	// 		];
	// 	} else if (this.direction === Directon.right) {
	// 		return [
	// 			{ x: this.x + this.side, y: this.y },
	// 			{ x: this.x + this.side, y: this.y + this.side / 2 },
	// 			{ x: this.x + this.side, y: this.y + this.side },
	// 		];
	// 	} else if (this.direction === Directon.bottom) {
	// 		return [
	// 			{ x: this.x, y: this.y + this.side },
	// 			{ x: this.x + this.side / 2, y: this.y + this.side },
	// 			{ x: this.x + this.side, y: this.y + this.side },
	// 		];
	// 	} else if (this.direction === Directon.left) {
	// 		return [
	// 			{ x: this.x, y: this.y },
	// 			{ x: this.x, y: this.y + this.side / 2 },
	// 			{ x: this.x, y: this.y + this.side },
	// 		];
	// 	}
	// }

	helpNavigate(tile1, tile2) {
		// TODO: check cases with teleports, add types
		const [point1, point2] = this.getCollisionPoints();
		let gotHelp = false;
		const emptyTile = [tile1, tile2].find(tile => tile.type === Tiles.none);

		if (this.direction === Directon.right || this.direction === Directon.left) {
			if (Math.min(Math.abs(emptyTile.y - point1.y), Math.abs(emptyTile.y - point2.y)) < 8) {
				gotHelp = true;
				this.y = emptyTile.y;
			}
		} else {
			if (Math.min(Math.abs(emptyTile.x - point1.x), Math.abs(emptyTile.x - point2.x)) < 8) {
				gotHelp = true;
				this.x = emptyTile.x;
			}
		}

		if (!gotHelp) {
			this.x = this.prevX;
			this.y = this.prevY;
		}
	}

	// helpNavigate(tiles: any[]) {
	// 	// TODO: check cases with teleports, add types
	// 	const [point1, point2] = this.getCollisionPoints();
	// 	const emptyTile = tiles.find(tile => tile.type === Tiles.none);

	// 	if (solid.includes(tiles[0])) {
	// 		this.goBack();
	// 		return;
	// 	}

	// 	if (this.direction === Directon.right || this.direction === Directon.left) {
	// 		if (Math.min(Math.abs(emptyTile.y - point1.y), Math.abs(emptyTile.y - point2.y)) < 8) {
	// 			this.y = emptyTile.y;
	// 			return;
	// 		}
	// 	} else {
	// 		if (Math.min(Math.abs(emptyTile.x - point1.x), Math.abs(emptyTile.x - point2.x)) < 8) {
	// 			this.x = emptyTile.x;
	// 			return;
	// 		}
	// 	}

	// 	this.goBack();
	// }

	get outOfScreen() {
		const [point] = this.getCollisionPoints();
		return point.x > 600 || point.x < 0 || point.y > 600 || point.y < 0;
	}
}

export { Directon };
export default Entity;
