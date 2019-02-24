import * as entities from './entities';
import { checkEntityCollision } from './utils';
import { rigid } from './tileMap';
import c from './utils/console';

class EntityManager {
	public pool;
	private toRemoveQueue;

	constructor() {
		this.pool = {};
		this.toRemoveQueue = new Set();
	}

	spawnEntity(type, ...args) {
		const entity = new entities[type](...args);
		this.pool[entity.id] = entity;
	}

	toRemove = id => {
		this.toRemoveQueue.add(id);
	};

	removeFromQueue = () => {
		this.toRemoveQueue.forEach(entityId => {
			const entity = this.pool[entityId];
			const deathLeft = entity.timeManager.getTimer('death');
			if (!deathLeft) {
				delete this.pool[entityId];
				this.toRemoveQueue.delete(entityId);
			}
		});
	};

	get entities() {
		// TODO:
		return Object.values(this.pool);
	}

	forEach = cb => {
		return Object.values(this.pool).forEach(entity => {
			cb(entity);
		});
	};

	getEnemies() {
		return Object.values(this.pool).filter(entity => entity instanceof entities.Enemy);
	}

	getPlayer() {
		return Object.values(this.pool).find(entity => entity instanceof entities.Player);
	}

	getByIntersection(entity) {
		// Refactor name at least
		return Object.values(this.pool).filter((el: any) => {
			if ((el.type === 'enemy' || el.type === 'player') && checkEntityCollision(entity, el)) {
				return el;
			}
		});
	}

	render(game) {
		this.forEach(entity => entity.render(game));
	}

	update(game) {
		this.forEach(entity => entity.update(game));
	}

	checkCollisions(game) {
		const seen = new Set();
		this.forEach(entity => {
			const spawn = entity.timeManager.getTimer('spawn');
			const death = entity.timeManager.getTimer('death');
			if (entity instanceof entities.Flag || entity instanceof entities.Powerup || spawn || death) return;

			this.checkTileCollision(entity, game);
			this.checkEntitiesCollision(entity, seen, game);
			seen.add(entity.id);
		});
	}

	checkTileCollision(entity, game) {
		if (entity.isOutOfScreen()) {
			entity.resolveEdgeCollision();
		} else {
			const [first, second] = entity.getFrontCollisionPoints();
			const tiles = game.stage.map.lookupRange(first, second);
			const collided = tiles.filter(tile => rigid.includes(tile.type)).length;
			if (collided) {
				entity.resolveTileCollision(tiles, game);
			}
		}
	}

	checkEntitiesCollision(entity, seen, game) {
		this.forEach(other => {
			if (entity.id === other.id || seen.has(other.id)) return;
			const spawn = other.timeManager.getTimer('spawn');
			const death = other.timeManager.getTimer('death');

			if (!spawn && !death && checkEntityCollision(entity, other)) {
				entity.resolveEntityCollision(other, game, entity);
				other.resolveEntityCollision(entity, game, entity);
			}
		});
	}

	clear() {
		this.pool = {};
		this.toRemoveQueue = new Set();
	}
}

export default new EntityManager();
