import { Direction, TANK_SIDE } from './entities/common/constants';
import { Layers } from './tileMap';
import { randomInt } from './utils/random';
import entityManager from './entityManager';

// const START_TICKS = 10;
const START_TICKS = 300;
const STAGE_SPAWN_DELAY = 100;
const ENEMY_SPAWN_POSITION = [[0, 0], [560, 0]];

class Stage {
	public tanks;
	public map;
	public number;
	public startTick;
	public lastSpawnTick;

	constructor(map, tanks, number, startTick) {
		this.tanks = [...tanks];
		this.map = map;
		this.number = number;
		this.startTick = startTick;
		entityManager.spawnFlag();
	}

	spawnEnemy(game) {
		const { ticks } = game;
		if (!this.tanks.length || ticks - this.startTick < START_TICKS || !this.canSpawn(ticks)) return;
		const index = randomInt(2);
		let [x, y] = ENEMY_SPAWN_POSITION[index];
		if (entityManager.getByIntersection({ x, y, side: TANK_SIDE }).length) {
			[x, y] = ENEMY_SPAWN_POSITION[1 - index];
			if (entityManager.getByIntersection({ x, y, side: TANK_SIDE }).length) {
				return;
			}
		}
		entityManager.spawnEnemy(x, y, Direction.bottom, this.tanks.pop());
		this.lastSpawnTick = ticks;
	}

	spawnPowerUp() {}

	render() {
		this.map.renderLayer(Layers.under);
		this.map.renderLayer(Layers.main);
		entityManager.render();
		this.map.renderLayer(Layers.over);
	}

	canSpawn(ticks) {
		if (!this.lastSpawnTick) {
			return true;
		} else {
			return this.lastSpawnTick + STAGE_SPAWN_DELAY < ticks;
		}
	}
}
export { START_TICKS, STAGE_SPAWN_DELAY, ENEMY_SPAWN_POSITION };
export default Stage;
