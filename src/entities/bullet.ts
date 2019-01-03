import Entity, { Directon } from './Entity';
import tileMap from '../tileMap';

class Bullet extends Entity {
	update = deltaTime => {
		this.move(deltaTime);
	};

	resolveEdgeCollision = () => {
		this.destroy();
	};

	resolveTileCollision = (tile1, tile2) => {
		this.destroy();
		tileMap.destroy(tile1.x, tile1.y);
		tileMap.destroy(tile2.x, tile2.y);
	};

	resolveEntityCollision(other) {
		this.destroy();
	}
}

export default Bullet;
