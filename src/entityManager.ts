import { createEnemy, createPlayer, createBullet, createFlag } from './entities';
import { squareIntersection, idGen } from './utils';
import { rigid } from './tileMap';

class EntityManager {
	public constructors;
	public pool;
	private toRemoveQueue;

	constructor() {
		this.pool = {};
		this.toRemoveQueue = new Set();
	}

	setupEntityConstructors(sprites) {
		this.constructors = {
			player: createPlayer(sprites.player, sprites.tankSpawnAnimation, sprites.tankDeathAnimation),
			enemy: createEnemy(sprites.enemy, sprites.tankSpawnAnimation, sprites.tankDeathAnimation),
			bullet: createBullet(sprites.bullet),
			flag: createFlag(sprites.flag, sprites.flagDeath),
		};
	}

	spawnPlayer() {
		const player = this.constructors.player(idGen());
		this.pool[player.id] = player;
	}

	spawnEnemy(x, y, direction, type) {
		const enemy = this.constructors.enemy(idGen(), x, y, direction, type);
		this.pool[enemy.id] = enemy;
	}

	spawnBullet(x, y, direction, shooter) {
		const bullet = this.constructors.bullet(idGen(), x, y, direction, shooter);
		this.pool[bullet.id] = bullet;
	}

	spawnFlag() {
		const flag = this.constructors.flag(idGen());
		this.pool[flag.id] = flag;
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

	getByIntersection(entity) {
		return Object.values(this.pool).filter((el: any) => {
			if ((el.type === 'enemy' || el.type === 'player') && squareIntersection(entity, el)) {
				return el;
			}
		});
	}

	render() {
		this.forEach(entity => entity.render());
	}

	update(deltaTime, game) {
		this.forEach(entity => entity.update(deltaTime, game));
	}

	checkTileCollision(game) {
		this.forEach(entity => {
			// if (!(entity instanceof Entity) || entity.isDeath) return;

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
		this.forEach(entity => {
			if (entity.isDeath) return;
			this.forEach(other => {
				if (entity.id === other.id) return;
				if (squareIntersection(entity, other)) {
					entity.resolveEntityCollision(other, game, entity);
					other.resolveEntityCollision(entity, game, entity);
				}
			});
		});
	}
}

export default new EntityManager();
