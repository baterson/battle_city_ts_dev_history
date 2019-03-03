import { Entity } from './Entity';
import { Vector } from '../utils';
import { PowerupTypes } from '../types';
import { Player } from './Player';
import { SoundManager, entityManager } from '../managers';
import { assetsHolder } from '../utils';

export class PowerupEvents {
	public observers: { [key: number]: (eventType: PowerupTypes) => void } = {};

	subscribe(entityId: number, observer: (eventType: PowerupTypes) => void) {
		this.observers[entityId] = observer;
	}

	unsubscribe(entityId: number) {
		delete this.observers[entityId];
	}

	notify(eventType: PowerupTypes) {
		Object.values(this.observers).forEach((observer: any): any => observer(eventType));
	}
}

export const powerupEvents = new PowerupEvents();

export class Powerup extends Entity {
	public type: PowerupTypes;
	public soundManager: SoundManager<'powerup'>;

	constructor(type: PowerupTypes, position: Vector) {
		super(position, new Vector(40, 40));
		this.type = type;
		this.soundManager = new SoundManager(['powerup']);
	}

	update() {}

	render() {
		assetsHolder.sprites.powerup[this.type](this.position, this.size);
	}

	resolveEntityCollision(other) {
		if (other instanceof Player) {
			entityManager.toRemove(this.id);
			powerupEvents.notify(this.type);
			this.soundManager.play('powerup');
		}
	}
}
