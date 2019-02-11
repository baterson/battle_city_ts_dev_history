import * as entities from './entities';
import { checkEntityCollision } from './utils';
import { rigid } from './tileMap';
import { Enemy, Player, Bullet, Flag } from './entities';

class EntityManager {
	public pool;
	private toRemoveQueue;

	constructor() {
		this.pool = {};
		this.toRemoveQueue = new Set();
	}

	spawnEntity(type, game, ...args) {
		const entity = entities[type](game, ...args);
		this.pool[entity.id] = entity;
	}

	toRemove = id => {
		this.toRemoveQueue.add(id);
	};

	removeFromQueue = () => {
		this.toRemoveQueue.forEach(entityId => {
			const entity = this.pool[entityId];
			if (!entity.deathTick) {
				delete this.pool[entityId];
				this.toRemoveQueue.delete(entityId);
			}
		});
	};

	forEach = cb => {
		return Object.values(this.pool).forEach(entity => {
			cb(entity);
		});
	};

	getEnemies() {
		return Object.values(this.pool).filter((el: any) => el.type === 'enemy');
	}

	getPlayer() {
		return this.pool[1];
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

	checkTileCollision(game) {
		this.forEach(entity => {
			if (entity instanceof Flag) return;
			if (entity.timers) {
				const spawn = entity.timers.getTimer('spawn');
				const death = entity.timers.getTimer('death');
				if (spawn || death) return;
			}

			if (entity.isOutOfScreen()) {
				entity.resolveEdgeCollision();
			} else {
				const points = entity.getCollisionPoints();
				const tiles = game.stage.map.lookupMany(points);
				const collided = tiles.filter(tile => rigid.includes(tile.type)).length;

				if (collided) {
					entity.resolveTileCollision(tiles, game);
				}
			}
		});
	}

	checkEntitiesCollision(game) {
		// TODO check for spawn and death
		const seen = new Set();
		this.forEach(entity => {
			if (entity instanceof Flag) return;
			// if(entity instanceof Flag || entity instanceof Powerup )
			if (entity.timers) {
				const spawn = entity.timers.getTimer('spawn');
				const death = entity.timers.getTimer('death');
				if (spawn || death) return;
			}

			seen.add(entity.id);
			this.forEach(other => {
				if (entity.id === other.id || seen.has(other.id)) return;

				if (checkEntityCollision(entity, other)) {
					entity.resolveEntityCollision(other, game, entity);
					other.resolveEntityCollision(entity, game, entity);
				}
			});
		});
	}

	clear() {
		this.pool = {};
		this.toRemoveQueue = new Set();
	}
}

export default new EntityManager();
