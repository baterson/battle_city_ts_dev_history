import { Enemy } from './entities';

class EntityPool {
	// TODO: getter for pool
	public pool;
	private removedEntities;

	constructor() {
		this.pool = {};
		this.removedEntities = [];
	}

	add = entity => {
		this.pool[entity.id] = entity;
	};

	toRemove = id => {
		this.removedEntities.push(id);
		// delete this.pool[id];
	};

	removeEntities = () => {
		this.removedEntities.forEach(entityId => {
			delete this.pool[entityId];
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
