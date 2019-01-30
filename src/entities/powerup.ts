import entityManager from '../entityManager';
import { Powerups } from './common/constants';

function helmet(game) {}

function grenade(game) {
	const enemies = entityManager.getEnemies();
	enemies.forEach((enemy: any) => {
		enemy.die();
	});
}

function tank(game) {
	const player = entityManager.getPlayer();
	player.lives += 1;
}

function stopwatch(game) {
	const enemies = entityManager.getEnemies();
	enemies.forEach((enemy: any) => {
		enemy.freeze(game);
	});
}

const actions = {
	[Powerups.helmet]: helmet,
	[Powerups.grenade]: grenade,
	[Powerups.tank]: tank,
	[Powerups.stopwatch]: stopwatch,
};

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
