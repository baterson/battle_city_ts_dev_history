class Vector {
	constructor(public x, public y) {
		this.x = x;
		this.y = y;
	}

	set(vector: Vector) {
		this.x = vector.x;
		this.y = vector.y;
	}
}

export { Vector };
