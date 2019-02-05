import { Direction, BULLET_SIDE } from './constants';
import entityManager from '../../entityManager';

function shot(game) {
	// TODO: Firerate scale
	const shotCD = getStateRemainingTime('shotCD', this, game);
	if (shotCD >= 0) return;

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
	this.state.shotCD = game.elapsedTime;
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
