import pool from './gameObjectPool';
import squareIntersection from './utils/squareIntersection';
import { rigid } from './TileMap';
import { Entity } from './gameObjects';

class CollisionManager {
	manageTiles = level => {
		pool.forEach(gameObject => {
			if (!(gameObject instanceof Entity) || gameObject.isDeath) return;

			if (gameObject.outOfScreen) {
				gameObject.resolveEdgeCollision();
			} else {
				this.checkTiles(gameObject, level);
			}
		});
	};

	manageEntities = level => {
		pool.forEach(gameObject => {
			if (gameObject.isDeath) return;
			this.checkEntities(gameObject, level);
		});
	};

	checkEntities = (gameObject, level) => {
		pool.forEach(other => {
			if (gameObject.id === other.id) return;
			if (squareIntersection(gameObject, other)) {
				gameObject.resolveEntityCollision(other, level, gameObject);
				other.resolveEntityCollision(gameObject, level, gameObject);
			}
		});
	};

	checkTiles = (gameObject, level) => {
		const points = gameObject.getCollisionPoints();
		const tiles = level.map.lookupMany(points);
		const collided = tiles.filter(tile => rigid.includes(tile.type)).length;

		if (collided) {
			gameObject.resolveTileCollision(tiles, level);
		}
	};
}

export default new CollisionManager();
