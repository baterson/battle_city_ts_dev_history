import { maps, tanks as tanksConfig } from './levelConfig';
import TileMap, { Layers } from './tileMap';
import canvas from './canvas';
import entityPool from './entityPool';
import collisionManager from './collisionManager';
import Level from './Level';

class Game {
	public level;
	public lives;

	constructor() {
		this.level = new Level(new TileMap(maps[0]), tanksConfig[0]);
		this.lives = 3;
	}

	createLoop() {
		let accumulatedTime = 0;
		let lastTime = 0;
		let deltaTime = 1 / 60;

		const loop = time => {
			accumulatedTime += (time - lastTime) / 1000;
			while (accumulatedTime > deltaTime) {
				this.update(deltaTime);
				accumulatedTime -= deltaTime;
			}
			lastTime = time;
			this.render();
			requestAnimationFrame(loop);
		};
		loop(0);
	}

	update(deltaTime) {
		entityPool.forEach(entity => {
			entity.update(deltaTime, this.level);
			collisionManager.manageTiles(this.level);
			collisionManager.manageEntities(this.level);
		});
		entityPool.removeEntities();

		if (!this.lives || this.level.isLost) {
			// todo gameover
		}

		const enemies = entityPool.getEnemies();
		const { tick, lastSpawnTick, tanks, number } = this.level;

		if (!tanks.length && !enemies.length) {
			// TODO fix some memory leak when all levels are finished
			const lvlNum = number + 1;
			this.level = new Level(new TileMap(maps[lvlNum]), tanksConfig[lvlNum]);
		} else if (tanks.length && enemies.length <= 1 && tick - lastSpawnTick > 50) {
			this.level.spawnEnemy();
		}

		this.level.timer.checkTimers(this.level.tick);
		this.level.incrementTick();
	}

	render() {
		// TODO: render layers in level
		// TODO: move all context to reset() method
		canvas.mainContext.clearRect(0, 0, 600, 600);
		canvas.mainContext.beginPath();
		canvas.dashboardContext.clearRect(0, 0, 750, 700);
		canvas.dashboardContext.beginPath();

		this.level.drawAll(this.lives);
		// TODO: move to stage
	}
}

export default Game;
