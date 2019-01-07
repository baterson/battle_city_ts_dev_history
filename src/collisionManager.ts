import entityPool from './entityPool';
import rectIntersection from './utils/rectIntersection';
import { rigid } from './TileMap';
import c from './utils/console';

class CollisionManager {
	manageTiles = level => {
		entityPool.forEach(entity => {
			// TODO: rethink movable
			if (!entity.movable) return;

			if (entity.outOfScreen) {
				entity.resolveEdgeCollision();
			} else {
				this.checkTiles(entity, level);
			}
		});
	};

	manageEntities = level => {
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

	checkTiles = (entity, level) => {
		const points = entity.getCollisionPoints();
		const tiles = level.map.lookupMany(points);
		if (rigid.includes(tiles[0].type) || rigid.includes(tiles[1].type) || rigid.includes(tiles[2].type)) {
			entity.resolveTileCollision(tiles, level);
		}
	};
}

export default new CollisionManager();
