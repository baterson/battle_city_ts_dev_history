import { Vector } from '../utils/Vector';
import { TimeManager } from '../managers/TimeManager';
import { Entity as IEntity } from '../types';

class Entity implements IEntity {
	static numberGen: number = 0;
	public id: number;
	public position: Vector;
	public size: Vector;
	public timeManager: TimeManager;

	constructor(position: Vector, size: Vector) {
		this.id = Entity.numberGen;
		this.position = position;
		this.size = size;
		// TODO: delete TimeManager
		this.timeManager = new TimeManager();
		Entity.numberGen += 1;
	}

	update(game) {}

	render(game) {}

	resolveEntityCollision(other, game) {}

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
