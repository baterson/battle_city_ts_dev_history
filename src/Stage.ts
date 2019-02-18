import { Direction, TANK_SIDE, Powerups } from './entities/common/constants';
import { TimeManager } from './utils/TimeManager';
import { Vector } from './utils/vector';
import { Layers } from './tileMap';
import { randomInt } from './utils/random';
import entityManager from './entityManager';

// const START_TICKS = 300;
const ENEMY_SPAWN_CD = 500;
const ENEMY_SPAWN_POSITION = [[0, 0], [560, 0]];

class Stage {
	public number;
	public map;
	public tanks;
	public powerupsAvailable;
	public timeManager: TimeManager;

	constructor(number, map, tanks) {
		this.number = number;
		this.map = map;
		this.tanks = [...tanks];
		this.powerupsAvailable = 5;
		this.timeManager = new TimeManager();
	}

	update() {
		this.timeManager.decrementTimers();
	}

	isFinish() {
		const enemies = entityManager.getEnemies();
		return !this.tanks.length && !enemies.length;
	}

	spawnEnemy() {
		// TODO: parametrize it in TS
		// TODO: move stage state to stage
		const enemySpawnCD = this.timeManager.getTimer('enemySpawnCD');
		if (!this.tanks.length || enemySpawnCD) return;

		const index = randomInt(1);
		// const index = randomInt(2);
		let [x, y] = ENEMY_SPAWN_POSITION[index];
		if (entityManager.getByIntersection({ x, y, side: TANK_SIDE }).length) {
			// if spot is not available, try on the next frame
			[x, y] = ENEMY_SPAWN_POSITION[1 - index];
			if (entityManager.getByIntersection({ x, y, side: TANK_SIDE }).length) {
				return;
			}
		}
		this.timeManager.setTimer('enemySpawnCD', ENEMY_SPAWN_CD);
		entityManager.spawnEntity('Enemy', this.tanks.pop(), new Vector(x, y));
	}

	spawnPowerup(game) {
		// if (!this.powerupsAvailable || this.lastPowerupTick + POWERUP_SPAWN_DELAY > game.ticks) return;
		// const index = randomInt(Object.keys(Powerups).length / 2);
		// // entityManager.spawnPowerup(randomInt(600), randomInt(600), Powerups[Powerups[index]]); // TODO: looks odd
		// this.powerupsAvailable -= 1;
		// this.lastPowerupTick = game.ticks;
	}

	render(game) {
		this.map.renderLayer(Layers.under);
		this.map.renderLayer(Layers.main);
		entityManager.render(game);
		this.map.renderLayer(Layers.over);
	}
}
export { ENEMY_SPAWN_POSITION };
export default Stage;
