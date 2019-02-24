import { Entity } from './Entity';
import { Vector } from '../utils';
import { PowerupTypes } from '../types';
import { Player } from './Player';
import entityManager from '../entityManager';

class PowerupEvents {
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

class Powerup extends Entity {
	public type;

	constructor(type: PowerupTypes, position: Vector) {
		super(position, new Vector(40, 40));
		this.type = type;
	}

	update() {}

	render(game) {
		game.sprites.powerup[this.type](this.position, this.size);
	}

	resolveEntityCollision(other, game) {
		if (other instanceof Player) {
			entityManager.toRemove(this.id);
			powerupEvents.notify(this.type);
		}
	}
}

export { Powerup };
