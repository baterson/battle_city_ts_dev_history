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

		if (!this.lives) {
			// TODO: gameover
		}

		const enemies = entityPool.getEnemies();
		const { tick, lastSpawnTick, tanks, number } = this.level;
		let x = 0;

		if (!tanks.length && !enemies.length) {
			const lvlNum = number + 1;
			this.level = new Level(new TileMap(maps[lvlNum]), tanksConfig[lvlNum]);
		} else if (tanks.length && enemies.length <= 1 && tick - lastSpawnTick > 50) {
			this.level.spawnEnemy();
		}

		this.level.incrementTick();
	}

	render() {
		// TODO: render layers in level
		canvas.context.clearRect(0, 0, 600, 600);
		canvas.context.beginPath();
		this.level.map.renderLayer(Layers.under);
		this.level.map.renderLayer(Layers.main);
		entityPool.forEach(entity => entity.render());
		this.level.map.renderLayer(Layers.over);
	}
}

export default Game;
