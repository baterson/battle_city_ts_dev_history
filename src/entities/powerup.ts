import { Entity } from './Entity';
import { Vector } from '../utils';
import { PowerupTypes } from '../types';
import { Player } from './Player';
import { SoundManager } from '../managers';
import { assetsHolder } from '../utils';
import entityManager from '../entityManager';

export class PowerupEvents {
	public observers = {};

	subscribe(entityId, observer) {
		this.observers[entityId] = observer;
	}

	unsubscribe(entityId) {
		delete this.observers[entityId];
	}

	notify(eventType) {
		console.log(Object.values(this.observers));
		Object.values(this.observers).forEach((observer: any): any => observer(eventType));
	}
}

export const powerupEvents = new PowerupEvents();

export class Powerup extends Entity {
	public type: PowerupTypes;
	public soundManager: SoundManager;

	constructor(type: PowerupTypes, position: Vector) {
		super(position, new Vector(40, 40));
		this.type = type;
		this.soundManager = new SoundManager({ powerup: assetsHolder.audio.powerup });
	}

	update() {}

	render() {
		assetsHolder.sprites.powerup[this.type](this.position, this.size);
	}

	resolveEntityCollision(other, game) {
		if (other instanceof Player) {
			entityManager.toRemove(this.id);
			powerupEvents.notify(this.type);
			this.soundManager.play('powerup');
		}
	}
}
