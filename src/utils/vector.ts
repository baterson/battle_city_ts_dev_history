class Vector {
	public default: string[];

	constructor(public x, public y) {
		this.x = x;
		this.y = y;
		this.default = [x, y];
	}

	toDefault() {
		[this.x, this.y] = this.default;
	}
}

export { Vector };
