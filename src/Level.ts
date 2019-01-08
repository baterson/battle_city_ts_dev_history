import { Direction } from './entities/Entity';
import Flag from './entities/Flag';
import entityPool from './entityPool';
import { Enemy } from './entities';

class Level {
	public tanks;
	public map;
	public tick;
	public number;
	public lastSpawnTick;
	public isLost;

	constructor(map, tanks) {
		this.tanks = tanks;
		this.map = map;
		this.tick = 0;
		this.number = 0;
		this.lastSpawnTick = 0;
		this.isLost = false;
		entityPool.add(new Flag());
	}

	spawnEnemy() {
		if (!this.tanks.length) return;

		// TODO: Random topleft or topright
		const enemy = new Enemy({ x: 0, y: 0, direction: Direction.top, type: this.tanks.pop() });
		entityPool.add(enemy);
		this.lastSpawnTick = this.tick;
	}

	incrementTick() {
		this.tick += 1;
	}

	gameOver() {
		this.isLost = true;
	}
}

export default Level;
