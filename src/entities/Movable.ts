import { Entity } from './Entity';
import { Vector } from '../utils';
import { DELTA_TIME } from '../constants';
import { Direction, Sprite } from '../types';

export class Movable extends Entity {
	public direction: Direction;
	public prevPosition: Vector;

	constructor(position: Vector, size: Vector, direction: Direction) {
		super(position, size);
		this.direction = direction;
		this.prevPosition = new Vector(position.x, position.y);
	}

	move(velocity: number): void {
		this.prevPosition.set(this.position);

		if (this.direction === Direction.Top) {
			this.position.y -= velocity * DELTA_TIME;
		} else if (this.direction === Direction.Bottom) {
			this.position.y += velocity * DELTA_TIME;
		} else if (this.direction === Direction.Left) {
			this.position.x -= velocity * DELTA_TIME;
		} else if (this.direction === Direction.Right) {
			this.position.x += velocity * DELTA_TIME;
		}
	}

	goBack(): void {
		this.position.set(this.prevPosition);
	}

	animateMovement(sprite: Sprite[]): void {
		let distance;
		if (this.direction === Direction.Left || this.direction === Direction.Right) {
			distance = this.position.x;
		} else {
			distance = this.position.y;
		}
		const index = Math.floor(distance) % sprite.length;
		sprite[index](this.position, this.size);
	}

	isOutOfScreen(): boolean {
		const box = this.getBoundingBox();
		return box.y1 < 0 || box.y2 > 600 || box.x1 < 0 || box.x2 > 600;
	}

	getFrontCollisionPoints(): [number, number][] {
		const { x1, x2, y1, y2 } = this.getBoundingBox();
		if (this.direction === Direction.Top) {
			return [[x1, y1], [x2, y1]];
		} else if (this.direction === Direction.Right) {
			return [[x2, y1], [x2, y2]];
		} else if (this.direction === Direction.Bottom) {
			return [[x1, y2], [x2, y2]];
		} else if (this.direction === Direction.Left) {
			return [[x1, y1], [x1, y2]];
		}
	}
}
