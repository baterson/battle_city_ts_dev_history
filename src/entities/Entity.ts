import { Vector } from '../utils/vector';

class Entity {
	static numberGen: number = 0;
	public id: number;
	public position: Vector;
	public size: Vector;

	constructor(position, size) {
		this.id = Entity.numberGen;
		this.position = position;
		this.size = size;
		Entity.numberGen += 1;
	}

	getBoundingBox() {
		const { x, y } = this.position;
		const { x: width, y: height } = this.size;

		return {
			left: x,
			right: x + width,
			top: y,
			bottom: y + height,
		};
	}
}

export { Entity };
