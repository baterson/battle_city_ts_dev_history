import Tank from './Tank';
import { Directon } from './Entity';
import { Tiles } from '../tileMap';
import Bullet from './Bullet';

class Enemy extends Tank {
	private prevTile: any;

	constructor(x, y, side, direction, velocity, sprites) {
		super(x, y, side, direction, velocity, sprites);
		this.prevTile = { x: 0, y: 0 };
	}

	update = deltaTime => {
		this.move(deltaTime);
	};

	setRandomDirection = () => {
		const items = [Directon.top, Directon.right, Directon.bottom, Directon.left];
		const index = Math.floor(Math.random() * items.length);
		this.direction = items[index];
	};

	move(deltaTime) {
		super.move(deltaTime);
		if (
			Math.abs(Math.floor(this.prevTile.x - this.x)) > 120 ||
			Math.abs(Math.floor(this.prevTile.y - this.y)) > 120
		) {
			this.prevTile = { x: this.x, y: this.y };
			this.setRandomDirection();
			// TODO: Coin
			if (Math.round(Math.random()) === 1) this.shot();
		}
	}

	resolveEdgeCollision() {
		super.resolveEdgeCollision();
		this.setRandomDirection();
	}

	// TODO: Tile types
	resolveTileCollision(tile1, tile2) {
		this.goBack();
		this.setRandomDirection();
	}

	// resolveTileCollision(tile1, tile2) {
	// 	if (tile1.type === Tiles.none || tile2.type === Tiles.none) {
	// 		this.helpNavigate(tile1, tile2);
	// 	} else {
	// 		this.x = this.prevX;
	// 		this.y = this.prevY;
	// 		this.setRandomDirection();
	// 	}
	// }

	resolveEntityCollision(other) {
		if (other instanceof Bullet) {
			this.destroy();
		} else {
			this.x = this.prevX;
			this.y = this.prevY;
			this.setRandomDirection();
		}
	}
}

export default Enemy;
