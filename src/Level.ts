import { Direction } from './entities/Entity';
import Flag from './entities/Flag';
import Timer from './Timer';
import entityPool from './entityPool';
import { Enemy } from './entities';
import Sprite from './Sprite';

class Level {
	public tanks;
	public map;
	public tick;
	public number;
	public lastSpawnTick;
	public isLost;
	public timer;

	constructor(map, tanks) {
		this.tanks = tanks;
		this.map = map;
		this.tick = 0;
		this.number = 0;
		this.lastSpawnTick = 0;
		this.isLost = false;
		this.timer = new Timer();
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

	drawDashboard() {
		const x = new Sprite(320.25, 192.75, 8.5, 7.75);
		x.draw(670, 70, 15, 'dashboardContext');
		x.draw(690, 70, 15, 'dashboardContext');
		x.draw(670, 90, 15, 'dashboardContext');
		x.draw(690, 90, 15, 'dashboardContext');
	}
}

export default Level;
