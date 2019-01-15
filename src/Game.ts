import { maps, tanks as tanksConfig } from './stageConfig';
import { START_TICKS } from './constants';
import { Flag } from './gameObjects';
import mainScreen from './screens/mainScreen';
import dashboard from './screens/dashboard';
import TileMap from './tileMap';
import pool from './gameObjectPool';
import collisionManager from './collisionManager';
import Stage from './Stage';
import timer from './timer';

const GAME_OVER = false;

class Game {
	public stage;
	public lives;

	constructor() {
		this.stage = new Stage(new TileMap(maps[0]), tanksConfig[0], 1);
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
		pool.forEach(entity => {
			entity.update(deltaTime, this.stage);
			collisionManager.manageTiles(this.stage);
			collisionManager.manageEntities(this.stage);
		});

		if (!this.lives || this.stage.isLost) {
			// todo gameover
		}

		const { tanks, number } = this.stage;

		if (!tanks.length && !pool.getEnemies().length) {
			// TODO fix some memory leak when all stages are finished
			const lvlNum = number + 1;
			this.stage = new Stage(new TileMap(maps[lvlNum]), tanksConfig[lvlNum], lvlNum);
			timer.reset();
			pool.add(new Flag());
		}

		this.stage.spawnEnemy();
		timer.checkAll();
		timer.increment();
		pool.removeFromQueue();
	}

	render() {
		mainScreen.clearScreen();
		dashboard.clearScreen();
		this.stage.draw();
		dashboard.draw(this.stage.number, this.lives, this.stage.tanks);
		if (timer.ticks < START_TICKS) {
			mainScreen.drawStageStart();
		}
	}

	//gameOver(){}

	//runIntro()

	//changeStage - stageTick, new
	//stageNum, new Map, new Tanks and pass game all around
}

export { GAME_OVER };
export default Game;
