import { maps, tanks as tanksConfig } from './stageConfig';
import { setupSprites } from './utils';
import { START_TICKS } from './constants';
import TileMap from './tileMap';
import entityManager from './entityManager';
import Stage from './Stage';
import { main as mainScreen, dashboard } from './screens';

const GAME_OVER = false;

class Game {
	public stage;
	public lives;
	public sprites;
	public effects;

	constructor(image) {
		this.sprites = setupSprites(image);
		this.stage = new Stage(new TileMap(maps[0], this.sprites.tiles), tanksConfig[0], 1);
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
		entityManager.update(deltaTime, this);
		entityManager.checkTileCollision(this);
		entityManager.checkEntitiesCollision(this);

		// todo gameover

		const { tanks, number } = this.stage;

		// if (!tanks.length && !pool.getEnemies().length) {
		// 	// TODO fix some memory leak when all stages are finished
		// 	const lvlNum = number + 1;
		// 	this.stage = new Stage(new TileMap(maps[lvlNum]), tanksConfig[lvlNum], lvlNum);
		// 	pool.add(new Flag());
		// }

		// this.stage.spawnEnemy();
		this.stage.incrementTicks();
		entityManager.removeFromQueue();
	}

	render() {
		mainScreen.clearScreen();
		dashboard.clearScreen();
		this.stage.draw();
		// dashboard.draw(this.stage.number, this.lives, this.stage.tanks);
		if (this.stage.ticks < START_TICKS) {
			mainScreen.drawStageStarting();
		}
	}

	//gameOver(){}

	//runIntro()

	//changeStage - stageTick, new
	//stageNum, new Map, new Tanks and pass game all around
}

export { GAME_OVER };
export default Game;
