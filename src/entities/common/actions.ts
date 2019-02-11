import { Direction, BULLET_SIDE } from './constants';
import { Vector } from '../../utils/vector';
import entityManager from '../../entityManager';

function shot(cd: number) {
	// TODO: Firerate scale
	const shotCD = this.timers.getTimer('shotCD');
	if (shotCD) return;

	let bulletArgs;
	if (this.direction === Direction.Top) {
		bulletArgs = { x: this.position.x + this.size.width / 2 - BULLET_SIDE / 2, y: this.position.y - BULLET_SIDE };
	} else if (this.direction === Direction.Right) {
		bulletArgs = { x: this.position.x + this.size.width, y: this.position.y + this.size.width / 2 - BULLET_SIDE / 2 };
	} else if (this.direction === Direction.Bottom) {
		bulletArgs = { x: this.position.x + this.size.width / 2 - BULLET_SIDE / 2, y: this.position.y + this.size.width };
	} else {
		bulletArgs = { x: this.position.x - BULLET_SIDE, y: this.position.y + this.size.width / 2 - BULLET_SIDE / 2 };
	}

	entityManager.spawnEntity('bullet', new Vector(bulletArgs.x, bulletArgs.y), this.direction, this);
	this.timers.setTimer('shotCD', cd);
}

// interface states available

const stateToTimeMap = {
	death: 2,
	spawn: 1,
	shotCD: 1,
	freeze: 2,
	invincible: 0.1,
	stageStarting: 0.5,
	gameOver: 0.5,
	enemySpawnCD: 0.1,
};

function getStateRemainingTime(stateName, entity, game) {
	const time = stateToTimeMap[stateName];
	const remaining = entity.state.hasOwnProperty(stateName) ? entity.state[stateName] + time - game.elapsedTime : -1;
	return remaining;
}

export { shot, getStateRemainingTime };
