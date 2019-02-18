import { Vector } from '../utils/vector';
import { TimeManager } from '../utils/TimeManager';

class Entity {
	static numberGen: number = 0;
	public id: number;
	public position: Vector;
	public size: Vector;
	public timeManager: TimeManager;

	constructor(position, size) {
		this.id = Entity.numberGen;
		this.position = position;
		this.size = size;
		this.timeManager = new TimeManager();
		Entity.numberGen += 1;
	}

	getBoundingBox() {
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

export { Entity };
