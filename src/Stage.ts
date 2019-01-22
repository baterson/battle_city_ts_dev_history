import { Direction, TANK_SIDE, Powerups } from './entities/common/constants';
import { Layers } from './tileMap';
import { randomInt } from './utils/random';
import entityManager from './entityManager';

const START_TICKS = 10;
// const START_TICKS = 300;
const STAGE_SPAWN_DELAY = 100;
const POWERUP_SPAWN_DELAY = 300;
const ENEMY_SPAWN_POSITION = [[0, 0], [560, 0]];

class Stage {
	public tanks;
	public map;
	public number;
	public startTick;
	public lastSpawnTick; // TODO: tank spawn tick
	public lastPowerupTick;
	public powerupsAvailable;

	constructor(map, tanks, number, startTick) {
		this.tanks = [...tanks];
		this.map = map;
		this.number = number;
		this.startTick = startTick;
		this.lastPowerupTick = POWERUP_SPAWN_DELAY;
		this.powerupsAvailable = 5;
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

	spawnPowerup(game) {
		if (!this.powerupsAvailable || this.lastPowerupTick + POWERUP_SPAWN_DELAY > game.ticks) return;
		const index = randomInt(Object.keys(Powerups).length / 2);
		entityManager.spawnPowerup(randomInt(600), randomInt(600), Powerups[Powerups[index]]); // TODO: looks odd
		this.powerupsAvailable -= 1;
		this.lastPowerupTick = game.ticks;
	}

	render(game) {
		this.map.renderLayer(Layers.under);
		this.map.renderLayer(Layers.main);
		entityManager.render(game);
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
