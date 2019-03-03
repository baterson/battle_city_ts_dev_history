import { Vector } from '../utils/Vector';
import { BoundingBox } from '../types';

export class Entity {
	static numberGen: number = 0;
	public id: number;
	public position: Vector;
	public size: Vector;

	constructor(position: Vector, size: Vector) {
		this.id = Entity.numberGen;
		this.position = position;
		this.size = size;
		Entity.numberGen += 1;
	}

	update() {}

	render() {}

	resolveEntityCollision(other) {}

	getBoundingBox(): BoundingBox {
		const { x, y } = this.position;
		const { x: width, y: height } = this.size;

		return {
			x1: x,
			x2: x + width,
			y1: y,
			y2: y + height,
		};
	}
}
