export class Vector {
	public x;
	public y;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	set(vector: Vector) {
		this.x = vector.x;
		this.y = vector.y;
	}
}
