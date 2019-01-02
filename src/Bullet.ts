import Entity, { Directon } from './Entity';
import rangeIntersect from './utils/rangeIntersect';
import tileMap from './tileMap';

class Bullet extends Entity {
	update = deltaTime => {
		if (this.outOfScreen) {
			this.destroy();
			console.log('CAlled?');
		} else {
			console.log('Y', this.y);
			this.move(deltaTime);
			this.checkTileCollision();
		}
	};

	checkTileCollision = () => {
		const tile = tileMap.lookup(this.x, this.y);
		let hasCollision = false;

		if (tile.type === 1) {
			const x = rangeIntersect(this.x, this.x + this.width, tile.x, tile.x + 40);
			const y = rangeIntersect(this.y, this.y + this.height, tile.y, tile.y + 40);
			if (x && y) hasCollision = true;
		}

		if (hasCollision) {
			this.destroy();
			tileMap.destroy(this.x, this.y);
		}
	};
}

export default Bullet;
