import entityPool from './entityPool';
import tileMap from './tileMap';
import rectIntersection from './utils/rectIntersection';
import { bricks } from './tileMap';
import c from './utils/console';

class CollisionManager {
	manageTiles = () => {
		entityPool.forEach(entity => {
			if (entity.outOfScreen) {
				entity.resolveEdgeCollision();
			} else {
				this.checkTiles(entity);
			}
		});
	};

	manageEntities = () => {
		entityPool.forEach(entity => this.checkEntities(entity));
	};

	checkEntities = entity => {
		entityPool.forEach(otherEntity => {
			if (entity.id === otherEntity.id) return;
			if (rectIntersection(entity, otherEntity)) {
				entity.resolveEntityCollision(otherEntity);
				otherEntity.resolveEntityCollision(entity);
			}
		});
	};

	checkTiles = entity => {
		const [point1, point2] = entity.getCollisionPoints();
		const tile1 = tileMap.lookup(point1);
		const tile2 = tileMap.lookup(point2);
		if (bricks.includes(tile1.type) || bricks.includes(tile2.type)) {
			entity.resolveTileCollision(tileMap.lookup(point1), tileMap.lookup(point2));
		}
	};
}

export default new CollisionManager();
