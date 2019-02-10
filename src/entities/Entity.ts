class Entity {
	public id: number;
	static numberGen: number;

	constructor(public position, public size) {
		this.id = Entity.numberGen;
		this.position = position;
		this.size = size;
		Entity.numberGen += 1;
	}
}

export { Entity };
