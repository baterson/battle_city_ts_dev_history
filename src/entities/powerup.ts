import entityManager from '../entityManager';
import { Powerups } from './common/constants';

class PowerupEvents {
	public observers = {};

	subscribe(entityId, observer) {
		this.observers[entityId] = observer;
	}

	unsubscribe(entityId) {
		delete this.observers[entityId];
	}

	notify(eventType) {
		Object.values(this.observers).forEach((observer: any): any => observer(eventType));
	}
}

export const powerupEvents = new PowerupEvents();

export function powerup(id, game, x, y, powerupType) {
	return {
		type: 'powerup',
		id,
		x,
		y,
		side: 40,

		update() {},
		render(game) {
			game.sprites[this.type][powerupType](this.x, this.y, this.side);
		},
		resolveEntityCollision(other, game) {
			entityManager.toRemove(this.id);
			powerupEvents.notify(powerupType);
		},
	};
}
