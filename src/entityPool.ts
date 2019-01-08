import { Enemy } from './entities';

class EntityPool {
	// TODO: getter for pool
	public pool;
	private removedEntities;

	constructor() {
		this.pool = {};
		this.removedEntities = new Set();
	}

	add = entity => {
		this.pool[entity.id] = entity;
	};

	toRemove = id => {
		this.removedEntities.add(id);
	};

	removeEntities = () => {
		this.removedEntities.forEach(entityId => {
			if (this.pool[entityId].deathTimer === 0) {
				delete this.pool[entityId];
				this.removedEntities.delete(entityId);
			}
		});
	};

	forEach = cb => {
		return Object.keys(this.pool).forEach(key => {
			cb(this.pool[key]);
		});
	};

	getEnemies(): any[] {
		return Object.values(this.pool).filter(entity => entity instanceof Enemy);
	}
}

export default new EntityPool();
