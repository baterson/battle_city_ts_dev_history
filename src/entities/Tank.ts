import { Movable } from './Movable';
import { powerupEvents } from './Powerup';
import { BULLET_SIZE, DEATH_FRAMES } from '../constants';
import { Vector } from '../utils';
import { TimeManager, SoundManager, entityManager } from '../managers';
import { Direction } from '../types';

export class Tank extends Movable {
	public timeManager: TimeManager<'death' | 'shotCD'>;
	public soundManager: SoundManager<'explode'>;

	constructor(position: Vector, size: Vector, direction: Direction) {
		super(position, size, direction);
	}

	shot(cd: number) {
		const shotCD = this.timeManager.getTimer('shotCD');
		if (shotCD) return;

		let bulletPosition;
		const box = this.getBoundingBox();
		const [width, height] = BULLET_SIZE;
		if (this.direction === Direction.Top) {
			bulletPosition = new Vector(this.size.x / 2 + this.position.x - width / 2, this.position.y - height);
		} else if (this.direction === Direction.Right) {
			// bulletPosition = new Vector(box.x2, box.y2 / 2 - height / 2);
			bulletPosition = new Vector(this.size.x + this.position.x, this.size.y / 2 + this.position.y - height / 2);
		} else if (this.direction === Direction.Bottom) {
			bulletPosition = new Vector(this.size.x / 2 + this.position.x - width / 2, this.size.y + this.position.y);
		} else {
			bulletPosition = new Vector(this.position.x - width, this.size.y / 2 + this.position.y - height / 2);
		}
		entityManager.spawnEntity('Bullet', bulletPosition, this.direction, this);
		this.timeManager.setTimer('shotCD', cd);
	}

	die() {
		this.timeManager.setTimer('death', DEATH_FRAMES);
		this.soundManager.play('explode');
		entityManager.toRemove(this.id);
		powerupEvents.unsubscribe(this.id);
	}
}
