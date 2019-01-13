import {
	Direction,
	START_TICKS,
	STAGE_SPAWN_TIMER,
	ENEMY_SPAWN_POSITION,
	STAGE_SPAWN_RETRY_TIMER,
	TANK_SIDE,
} from './constants';
import { Layers } from './tileMap';
import { Enemy } from './gameObjects';
import { randomInt } from './utils/random';
import timer from './timer';
import pool from './gameObjectPool';

class Stage {
	public tanks;
	public map;
	public number;
	public canSpawn;
	public isLost;

	constructor(map, tanks, number) {
		this.tanks = tanks;
		this.map = map;
		this.number = number;
		this.isLost = false;
		this.canSpawn = true;
	}

	spawnEnemy() {
		if (!this.tanks.length || timer.ticks < START_TICKS || !this.canSpawn) return;
		const index = randomInt(2);
		let [x, y] = ENEMY_SPAWN_POSITION[index];
		if (pool.getByIntersection({ x, y, side: TANK_SIDE }).length) {
			[x, y] = ENEMY_SPAWN_POSITION[1 - index];
			if (pool.getByIntersection({ x, y, side: TANK_SIDE }).length) {
				this.canSpawn = false;
				timer.set(STAGE_SPAWN_RETRY_TIMER, () => (this.canSpawn = true));
				return;
			}
		}

		const enemy = new Enemy(x, y, Direction.bottom, this.tanks.pop());
		this.canSpawn = false;
		pool.add(enemy);
		timer.set(STAGE_SPAWN_TIMER, () => (this.canSpawn = true));
	}

	gameOver() {
		this.isLost = true;
	}

	draw() {
		this.map.renderLayer(Layers.under);
		this.map.renderLayer(Layers.main);
		pool.forEach(entity => entity.render());
		this.map.renderLayer(Layers.over);
	}
}

export { START_TICKS };
export default Stage;
