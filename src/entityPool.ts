class EntityPool {
	// TODO: getter for pool
	public pool;

	constructor() {
		this.pool = {};
	}

	add = entity => {
		this.pool[entity.id] = entity;
	};

	remove = id => {
		delete this.pool[id];
	};

	forEach = cb => {
		return Object.keys(this.pool).forEach(key => {
			cb(this.pool[key]);
		});
	};
}

export default new EntityPool();
