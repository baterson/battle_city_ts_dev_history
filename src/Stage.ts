import { Direction, START_TICKS, STAGE_SPAWN_DELAY, ENEMY_SPAWN_POSITION, TANK_SIDE } from './constants';
import { Layers } from './tileMap';
import { Enemy } from './entities';
import { randomInt } from './utils/random';
import timer from './timer';
import pool from './entityPool';

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
		if (pool.getByIntersection({ x, y, side: TANK_SIDE }).length) {
			[x, y] = ENEMY_SPAWN_POSITION[1 - index];
			if (pool.getByIntersection({ x, y, side: TANK_SIDE }).length) {
				return;
			}
		}

		const enemy = new Enemy(x, y, Direction.bottom, this.tanks.pop());
		this.lastSpawnTick = this.ticks;
		pool.add(enemy);
	}

	spawnPowerUp() {}

	draw() {
		this.map.renderLayer(Layers.under);
		this.map.renderLayer(Layers.main);
		pool.forEach(entity => entity.render());
		this.map.renderLayer(Layers.over);
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
