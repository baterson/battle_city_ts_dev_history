import * as entities from '../entities';
import { Entities, Direction, TankTypes, PowerupTypes, Vector } from '../types';
import { checkEntityCollision } from '../utils';
import { TileMap } from '../TileMap';
import { rigid } from '../TileMap';

export class EntityManager {
	public pool: { [key: number]: Entities };
	private toRemoveQueue: Set<number>;

	constructor() {
		this.pool = {};
		this.toRemoveQueue = new Set();
	}

	spawnEntity(type: 'Player');
	spawnEntity(type: 'Flag');
	spawnEntity(type: 'Enemy', tankType: TankTypes, position: Vector);
	spawnEntity(type: 'Powerup', powerupType: PowerupTypes, position: Vector);
	spawnEntity(type: 'Bullet', position: Vector, direction: Direction, shooter: entities.Tank);
	spawnEntity(type, ...args) {
		const entity = new entities[type](...args);
		this.pool[entity.id] = entity;
	}

	toRemove = (id: number) => {
		this.toRemoveQueue.add(id);
	};

	removeFromQueue = () => {
		this.toRemoveQueue.forEach(entityId => {
			const entity = this.pool[entityId];
			const deathLeft = this.getTime(entity, 'death');
			if (!deathLeft) {
				delete this.pool[entityId];
				this.toRemoveQueue.delete(entityId);
			}
		});
	};

	getEnemies() {
		return this.entities.filter(entity => entity instanceof entities.Enemy);
	}

	getPlayer() {
		return this.entities.find(entity => entity instanceof entities.Player);
	}

	getFlag() {
		return this.entities.find(entity => entity instanceof entities.Flag);
	}

	getByIntersection(entity: entities.Movable) {
		return this.entities.filter(other => {
			if (
				(other instanceof entities.Enemy || other instanceof entities.Player) &&
				checkEntityCollision(entity.getBoundingBox(), other.getBoundingBox())
			) {
				return entity;
			}
		});
	}

	render() {
		this.entities.forEach(entity => entity.render());
	}

	update() {
		this.entities.forEach(entity => entity.update());
	}

	checkCollisions(tileMap: TileMap) {
		const seen = new Set();
		this.entities.forEach(entity => {
			const spawn = this.getTime(entity, 'spawn');
			const death = this.getTime(entity, 'death');
			if (entity instanceof entities.Flag || entity instanceof entities.Powerup || spawn || death) return;

			this.checkTileCollision(entity, tileMap);
			this.checkEntitiesCollision(entity, seen);
			seen.add(entity.id);
		});
	}

	checkTileCollision(entity: entities.Movable, tileMap: TileMap) {
		if (entity.isOutOfScreen()) {
			entity.resolveEdgeCollision();
		} else {
			const [first, second] = entity.getFrontCollisionPoints();
			const tiles = tileMap.lookupRange(first, second);
			const collided = tiles.filter(tile => rigid.includes(tile.type)).length;
			if (collided) {
				entity.resolveTileCollision(tiles, tileMap);
			}
		}
	}

	checkEntitiesCollision(entity: entities.Movable, seen: Set<number>) {
		this.entities.forEach(other => {
			if (entity.id === other.id || seen.has(other.id)) return;
			const spawn = this.getTime(other, 'spawn');
			const death = this.getTime(other, 'death');

			if (!spawn && !death && checkEntityCollision(entity.getBoundingBox(), other.getBoundingBox())) {
				entity.resolveEntityCollision(other);
				other.resolveEntityCollision(entity);
			}
		});
	}

	getTime(entity: any, timerName: string) {
		return entity.hasOwnProperty('timeManager') ? entity.timeManager.getTimer(timerName) : undefined;
	}

	clear() {
		this.pool = {};
		this.toRemoveQueue = new Set();
	}

	get entities(): Entities[] {
		return Object.values(this.pool);
	}
}

export const entityManager = new EntityManager();
