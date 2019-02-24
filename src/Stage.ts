import { PowerupTypes } from './types';
import { TANK_SIZE, POWERUP_SPAWN_CD, ENEMY_SPAWN_CD, ENEMY_SPAWN_POSITION } from './constants';
import { TimeManager } from './utils/TimeManager';
import { Vector, randomInt } from './utils';
import TileMap, { Layers } from './tileMap';
import entityManager from './entityManager';

class Stage {
	public number: number;
	public map: TileMap;
	public tanks: number[][];
	public powerupsAvailable: number;
	public timeManager: TimeManager;

	constructor(number, map, tanks) {
		this.number = number;
		this.map = map;
		this.tanks = [...tanks];
		this.powerupsAvailable = 5;
		this.timeManager = new TimeManager();
		entityManager.spawnEntity('Flag');
	}

	update() {
		this.timeManager.decrementTimers();
		this.spawnEnemy();
		this.spawnPowerup();
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
		// TODO: uncoment
		// const index = randomInt(2);
		let [x, y] = ENEMY_SPAWN_POSITION[index];
		// TODO: Fix it
		// if (entityManager.getByIntersection({ x, y, side: TANK_SIDE }).length) {
		// 	// if spot is not available, try on the next frame
		// 	[x, y] = ENEMY_SPAWN_POSITION[1 - index];
		// 	if (entityManager.getByIntersection({ x, y, side: TANK_SIDE }).length) {
		// 		return;
		// 	}
		// }
		this.timeManager.setTimer('enemySpawnCD', ENEMY_SPAWN_CD);
		entityManager.spawnEntity('Enemy', this.tanks.pop(), new Vector(x, y));
	}

	spawnPowerup() {
		const powerupSpawnCD = this.timeManager.getTimer('powerupSpawnCD');
		if (!powerupSpawnCD || !this.powerupsAvailable) return;

		const index = randomInt(Object.keys(PowerupTypes).length / 2);
		entityManager.spawnEntity(PowerupTypes[PowerupTypes[index]], new Vector(randomInt(600), randomInt(600))); // TODO: looks odd
		this.timeManager.setTimer('powerupSpawnCD', POWERUP_SPAWN_CD);
		this.powerupsAvailable -= 1;
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
