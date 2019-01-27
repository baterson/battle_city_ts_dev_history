import { Direction, BULLET_SIDE, SHOT_DELAY, TANK_DEATH_ANIMATION, TANK_SPAWN_ANIMATION } from './constants';
import entityManager from '../../entityManager';

function shot(ticks) {
	if (this.lastShotTick && this.lastShotTick + SHOT_DELAY > ticks) return;

	let bulletArgs;
	if (this.direction === Direction.top) {
		bulletArgs = { x: this.x + this.side / 2 - BULLET_SIDE / 2, y: this.y - BULLET_SIDE };
	} else if (this.direction === Direction.right) {
		bulletArgs = { x: this.x + this.side, y: this.y + this.side / 2 - BULLET_SIDE / 2 };
	} else if (this.direction === Direction.bottom) {
		bulletArgs = { x: this.x + this.side / 2 - BULLET_SIDE / 2, y: this.y + this.side };
	} else {
		bulletArgs = { x: this.x - BULLET_SIDE, y: this.y + this.side / 2 - BULLET_SIDE / 2 };
	}

	entityManager.spawnEntity('bullet', bulletArgs.x, bulletArgs.y, this.direction, this);
	this.lastShotTick = ticks;
}

const stateToTimeMap = {
	death: 4,
	spawn: 4,
};

function getState(type, entity, game) {
	const time = stateToTimeMap[type];
	const prop = `${type}Duration`;
	const timeLeft = entity.hasOwnProperty(prop) ? entity[prop] + time - game.elapsedTime : -1;
	return timeLeft;
}

function setState(type, entity, game) {
	entity[`${type}Duration`] = game.elapsedTime;
}

export { shot, getState, setState };
