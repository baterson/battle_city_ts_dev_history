import { Tiles } from '../tileMap';
import Entity, { Directon } from './Entity';
import entityPool from '../entityPool';
import bullet, { BULLET_SIDE } from '../entityConstructors/bullet';

class Tank extends Entity {
	helpNavigate(tile1, tile2) {
		// TODO: check cases with teleports
		const [point1, point2] = this.getCollisionPoints();
		let gotHelp = false;
		const emptyTile = [tile1, tile2].find(tile => tile.type === Tiles.none);

		if (this.direction === Directon.right || this.direction === Directon.left) {
			if (Math.min(Math.abs(emptyTile.y - point1.y), Math.abs(emptyTile.y - point2.y)) < 4) {
				gotHelp = true;
				this.y = emptyTile.y;
			}
		} else {
			if (Math.min(Math.abs(emptyTile.x - point1.x), Math.abs(emptyTile.x - point2.x)) < 4) {
				gotHelp = true;
				this.x = emptyTile.x;
			}
		}

		if (!gotHelp) {
			this.x = this.prevX;
			this.y = this.prevY;
		}
	}

	shot = () => {
		let bulletArgs;

		if (this.direction === Directon.top) {
			bulletArgs = { x: this.x + this.side / 2 - BULLET_SIDE / 2, y: this.y - BULLET_SIDE };
		} else if (this.direction === Directon.right) {
			bulletArgs = { x: this.x + this.side, y: this.y + this.side / 2 - BULLET_SIDE / 2 };
		} else if (this.direction === Directon.bottom) {
			bulletArgs = { x: this.x + this.side / 2 - BULLET_SIDE / 2, y: this.y + this.side };
		} else {
			bulletArgs = { x: this.x - BULLET_SIDE, y: this.y + this.side / 2 - BULLET_SIDE / 2 };
		}
		entityPool.add(bullet(bulletArgs.x, bulletArgs.y, this.direction));
	};
}

export default Tank;
