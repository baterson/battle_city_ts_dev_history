import { Direction } from './entities/Entity';
import Flag from './entities/Flag';
import Timer from './Timer';
import entityPool from './entityPool';
import { Enemy } from './entities';
import Sprite from './Sprite';
import c from './utils/console';

class Level {
	// TODO rename to stage
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
		this.number = 1;
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

	drawTanks() {
		if (!this.tanks.length) return;
		const sprite = new Sprite(320.25, 192.75, 8.5, 7.75);
		let y = 70;
		let counter = 0;
		this.tanks.forEach((_, idx) => {
			if (idx % 2 === 0) {
				sprite.draw(695, y, 15, 'dashboardContext');
			} else {
				sprite.draw(670, y, 15, 'dashboardContext');
			}

			if (counter === 2) {
				y += 20;
				counter = 0;
			} else {
				counter += 1;
			}
		});
	}

	drawLives(lives) {
		// const player = new Sprite(377, 135, 15.5, 8.5);
		const tank = new Sprite(376.5, 144.5, 8, 8.5);
		const live = this.getNumberSprite(lives);
		tank.draw(670, 380, 20, 'dashboardContext');
		live.draw(700, 380, 20, 'dashboardContext');
	}

	drawLevelNum() {
		const flag = new Sprite(375.5, 184, 17, 15);
		const number = this.getNumberSprite(this.number);
		flag.draw(670, 450, 40, 'dashboardContext');
		number.draw(690, 485, 20, 'dashboardContext');
	}

	drawDashboard(lives) {
		this.drawTanks();
		this.drawLives(lives);
		this.drawLevelNum();
	}

	getNumberSprite(num) {
		let index, y;
		const x = 328;
		const spriteWidth = 8;
		const firstNumbers = [0, 1, 2, 3, 4];
		const secondNumbers = [5, 6, 7, 8, 9];

		if (firstNumbers.includes(num)) {
			index = firstNumbers.indexOf(num);
			y = 184;
		} else {
			index = secondNumbers.indexOf(num);
			y = 191;
		}

		return new Sprite(x + index * spriteWidth, y, spriteWidth, 7);
	}
}

export default Level;
