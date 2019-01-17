import { Direction, START_TICKS, STAGE_SPAWN_DELAY, ENEMY_SPAWN_POSITION, TANK_SIDE } from './constants';
import { Layers } from './tileMap';
import { randomInt } from './utils/random';
import timer from './timer';
import entityManager from './entityManager';

class Stage {
	public tanks;
	public map;
	public number;
	public ticks;
	public lastSpawnTick;

	constructor(map, tanks, number) {
		this.tanks = tanks;
		this.map = map;
		this.number = number;
		this.ticks = 0;
	}

	spawnEnemy() {
		if (!this.tanks.length || timer.ticks < START_TICKS || !this.canSpawn) return;
		const index = randomInt(2);
		let [x, y] = ENEMY_SPAWN_POSITION[index];
		if (entityManager.getByIntersection({ x, y, side: TANK_SIDE }).length) {
			[x, y] = ENEMY_SPAWN_POSITION[1 - index];
			if (entityManager.getByIntersection({ x, y, side: TANK_SIDE }).length) {
				return;
			}
		}
		entityManager.spawnEnemy(x, y, Direction.bottom, this.tanks.pop());
		this.lastSpawnTick = this.ticks;
	}

	spawnPowerUp() {}

	draw() {
		this.map.renderLayer(Layers.under);
		this.map.renderLayer(Layers.main);
		entityManager.render();
		this.map.renderLayer(Layers.over);
	}

	incrementTicks() {
		this.ticks += 1;
	}

	get canSpawn() {
		if (!this.lastSpawnTick) {
			return true;
		} else {
			return this.lastSpawnTick + STAGE_SPAWN_DELAY < this.ticks;
		}
	}
}

export default Stage;
