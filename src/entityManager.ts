import * as entities from './entities';
import { squareIntersection, idGen } from './utils';
import { rigid } from './tileMap';

class EntityManager {
	public pool;
	private toRemoveQueue;

	constructor() {
		this.pool = {};
		this.toRemoveQueue = new Set();
	}

	spawnEntity(type, game, ...args) {
		const id = idGen.getId();
		this.pool[id] = entities[type](id, game, ...args);
	}

	// spawnPlayer() {
	// 	const player = this.constructors.player(idGen.getId());
	// 	this.pool[player.id] = player;
	// }

	// spawnEnemy(x, y, direction, type) {
	// 	const enemy = this.constructors.enemy(idGen.getId(), x, y, direction, type);
	// 	this.pool[enemy.id] = enemy;
	// }

	// spawnBullet(x, y, direction, shooter) {
	// 	const bullet = this.constructors.bullet(idGen.getId(), x, y, direction, shooter);
	// 	this.pool[bullet.id] = bullet;
	// }

	// spawnFlag() {
	// 	const flag = this.constructors.flag(idGen.getId());
	// 	this.pool[flag.id] = flag;
	// }

	// spawnPowerup(x, y, type) {
	// 	const powerup = this.constructors.powerup(idGen.getId(), x, y, type);
	// 	this.pool[powerup.id] = powerup;
	// }

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
			if ((el.type === 'enemy' || el.type === 'player') && squareIntersection(entity, el)) {
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
			if (!entity.canInitCollision || entity.isDeath) return;

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
		const seen = new Set();
		this.forEach(entity => {
			if (!entity.canInitCollision || entity.isDeath) return;
			seen.add(entity.id);
			this.forEach(other => {
				if (entity.id === other.id || seen.has(other.id)) return;
				if (squareIntersection(entity, other)) {
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
