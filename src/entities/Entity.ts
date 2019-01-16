import idGen from '../utils/idGen';

class Entity {
	public id;
	public x;
	public y;
	public side;

	constructor(x, y, side) {
		this.id = idGen();
		this.x = x;
		this.y = y;
		this.side = side;
	}
}

export default Entity;