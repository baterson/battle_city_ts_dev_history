import { Direction, TANK_SIDE, Powerups } from './entities/common/constants';
import { Layers } from './tileMap';
import { randomInt } from './utils/random';
import entityManager from './entityManager';
import { getStateRemainingTime } from './entities/common/actions';

const START_TICKS = 10;
// const START_TICKS = 300;
const STAGE_SPAWN_DELAY = 100;
const POWERUP_SPAWN_DELAY = 300;
const ENEMY_SPAWN_POSITION = [[0, 0], [560, 0]];

class Stage {
	public tanks;
	public map;
	public number;
	public startTime;
	public lastSpawnTick; // TODO: tank spawn tick
	public lastPowerupTick;
	public powerupsAvailable;
	public state: { enemySpawnCD?: number } = {};

	constructor(map, tanks, number, startTime) {
		this.tanks = [...tanks];
		this.map = map;
		this.number = number;
		this.startTime = startTime;
		this.lastPowerupTick = POWERUP_SPAWN_DELAY;
		this.powerupsAvailable = 5;
	}

	spawnEnemy(game) {
		// TODO: move stage state to stage
		const spartingLeft = getStateRemainingTime('stageStarting', game, game);
		const enemySpawnCDLeft = getStateRemainingTime('enemySpawnCD', this, game);
		if (!this.tanks.length || spartingLeft >= 0 || enemySpawnCDLeft >= 0) return;

		const index = randomInt(2);
		let [x, y] = ENEMY_SPAWN_POSITION[index];
		if (entityManager.getByIntersection({ x, y, side: TANK_SIDE }).length) {
			[x, y] = ENEMY_SPAWN_POSITION[1 - index];
			if (entityManager.getByIntersection({ x, y, side: TANK_SIDE }).length) {
				return;
			}
		}
		this.state.enemySpawnCD = game.elapsedTime;
		entityManager.spawnEntity('enemy', game, x, y, Direction.bottom, this.tanks.pop());
	}

	spawnPowerup(game) {
		if (!this.powerupsAvailable || this.lastPowerupTick + POWERUP_SPAWN_DELAY > game.ticks) return;
		const index = randomInt(Object.keys(Powerups).length / 2);
		// entityManager.spawnPowerup(randomInt(600), randomInt(600), Powerups[Powerups[index]]); // TODO: looks odd
		this.powerupsAvailable -= 1;
		this.lastPowerupTick = game.ticks;
	}

	render(game) {
		this.map.renderLayer(Layers.under);
		this.map.renderLayer(Layers.main);
		entityManager.render(game);
		this.map.renderLayer(Layers.over);
	}
}
export { START_TICKS, STAGE_SPAWN_DELAY, ENEMY_SPAWN_POSITION };
export default Stage;
