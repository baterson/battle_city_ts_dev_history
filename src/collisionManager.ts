import entityPool from './entityPool';
import rectIntersection from './utils/rectIntersection';
import { rigid } from './TileMap';
import c from './utils/console';

class CollisionManager {
	manageTiles = level => {
		entityPool.forEach(entity => {
			// TODO: rethink movable
			if (!entity.movable || entity.isDeath) return;

			if (entity.outOfScreen) {
				entity.resolveEdgeCollision();
			} else {
				this.checkTiles(entity, level);
			}
		});
	};

	manageEntities = level => {
		entityPool.forEach(entity => {
			if (entity.isDeath) return;
			this.checkEntities(entity, level);
		});
	};

	checkEntities = (entity, level) => {
		entityPool.forEach(otherEntity => {
			if (entity.id === otherEntity.id) return;
			if (rectIntersection(entity, otherEntity)) {
				entity.resolveEntityCollision(otherEntity, level);
				otherEntity.resolveEntityCollision(entity, level);
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
