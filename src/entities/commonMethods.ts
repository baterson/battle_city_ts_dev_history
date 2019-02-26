import { BULLET_SIZE, DEATH_FRAMES, DELTA_TIME } from '../constants';
import { Direction } from '../types';
import { Vector } from '../utils';
import { powerupEvents } from './Powerup';
import entityManager from '../entityManager';

export function shot(cd: number) {
	// TODO: Firerate scale
	const shotCD = this.timeManager.getTimer('shotCD');
	if (shotCD) return;

	let bulletPosition;
	// TODO: refactor to bullet height/width and to shooter
	if (this.direction === Direction.Top) {
		bulletPosition = new Vector(
			this.position.x + this.size.x / 2 - BULLET_SIZE[0] / 2,
			this.position.y - BULLET_SIZE[0]
		);
	} else if (this.direction === Direction.Right) {
		bulletPosition = new Vector(this.position.x + this.size.x, this.position.y + this.size.x / 2 - BULLET_SIZE[0] / 2);
	} else if (this.direction === Direction.Bottom) {
		bulletPosition = new Vector(this.position.x + this.size.x / 2 - BULLET_SIZE[0] / 2, this.position.y + this.size.x);
	} else {
		bulletPosition = new Vector(
			this.position.x - BULLET_SIZE[0],
			this.position.y + this.size.x / 2 - BULLET_SIZE[0] / 2
		);
	}

	entityManager.spawnEntity('Bullet', bulletPosition, this.direction, this);
	this.timeManager.setTimer('shotCD', cd);
}

export function move(velocity) {
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

export function goBack() {
	this.position.set(this.prevPosition);
}

export function animateMovement(sprites) {
	let distance;
	if (this.direction === Direction.Left || this.direction === Direction.Right) {
		distance = this.position.x;
	} else {
		distance = this.position.y;
	}
	const index = Math.floor(distance) % sprites.length;
	sprites[index](this.position, this.size);
}

export function isOutOfScreen() {
	const box = this.getBoundingBox();
	return box.y1 < 0 || box.y2 > 600 || box.x1 < 0 || box.x2 > 600;
}

export function getFrontCollisionPoints() {
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

export function destroy() {
	this.timeManager.setTimer('death', DEATH_FRAMES);
	this.soundManager.play('destroy');
	entityManager.toRemove(this.id);
	powerupEvents.unsubscribe(this.id);
}
