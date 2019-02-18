import { Direction, BULLET_SIDE } from './constants';
import { Vector } from '../../utils/vector';
import entityManager from '../../entityManager';

function shot(cd: number) {
	// TODO: Firerate scale
	const shotCD = this.timeManager.getTimer('shotCD');
	if (shotCD) return;

	let bulletPosition;
	// TODO: refactor to bullet height/width and to shooter
	if (this.direction === Direction.Top) {
		bulletPosition = new Vector(this.position.x + this.size.x / 2 - BULLET_SIDE / 2, this.position.y - BULLET_SIDE);
	} else if (this.direction === Direction.Right) {
		bulletPosition = new Vector(this.position.x + this.size.x, this.position.y + this.size.x / 2 - BULLET_SIDE / 2);
	} else if (this.direction === Direction.Bottom) {
		bulletPosition = new Vector(this.position.x + this.size.x / 2 - BULLET_SIDE / 2, this.position.y + this.size.x);
	} else {
		bulletPosition = new Vector(this.position.x - BULLET_SIDE, this.position.y + this.size.x / 2 - BULLET_SIDE / 2);
	}

	entityManager.spawnEntity('Bullet', bulletPosition, this.direction, this);
	this.timeManager.setTimer('shotCD', cd);
}

// interface states available

const stateToTimeMap = {
	death: 20,
	spawn: 20,
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
