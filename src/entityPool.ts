import { Enemy, Player } from './entities';
import { squareIntersection } from './utils/squareIntersection';

class EntityPool {
	// TODO: getter for pool
	public pool;
	private toRemoveQueue;

	constructor() {
		this.pool = {};
		this.toRemoveQueue = new Set();
	}

	add = entity => {
		this.pool[entity.id] = entity;
	};

	toRemove = id => {
		this.toRemoveQueue.add(id);
	};

	removeFromQueue = () => {
		this.toRemoveQueue.forEach(objectId => {
			const obj = this.pool[objectId];
			if (obj.deathTimer === 0 || !obj.deathTimer) {
				delete this.pool[objectId];
				this.toRemoveQueue.delete(objectId);
			}
		});
	};

	forEach = cb => {
		return Object.keys(this.pool).forEach(key => {
			cb(this.pool[key]);
		});
	};

	getEnemies() {
		return Object.values(this.pool).filter(obj => obj instanceof Enemy);
	}

	getByIntersection(entity) {
		return Object.values(this.pool).filter(obj => {
			if ((obj instanceof Enemy || obj instanceof Player) && squareIntersection(entity, obj)) {
				return obj;
			}
		});
	}
}

export default new EntityPool();
