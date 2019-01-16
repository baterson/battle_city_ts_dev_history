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
	// async setupSprites(image) {
	// 	const mainSprite = createSprite(image, mainScreen.context);
	// 	const dashboardSprite = createSprite(image, dashboard.context);

	// 	this.effects = {
	// 		tankDeath: [
	// 			{ sprite: mainSprite(336, 128.75, 32, 32), side: 80 },
	// 			{ sprite: mainSprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	// 			{ sprite: mainSprite(288.25, 128.75, 16, 15.5), side: 40 },
	// 			{ sprite: mainSprite(272.25, 128.75, 15.75, 14.25), side: 37 },
	// 			{ sprite: mainSprite(258, 128.75, 13.75, 13.25), side: 35 },
	// 		],
	// 		tankSpawn: [
	// 			{ sprite: mainSprite(257, 97, 15, 14), side: 35 },
	// 			{ sprite: mainSprite(273, 97, 15, 14), side: 35 },
	// 			{ sprite: mainSprite(288, 97, 15, 14), side: 35 },
	// 			{ sprite: mainSprite(303, 97, 15, 14), side: 35 },
	// 		],
	// 	};
	// }
}

export { GAME_OVER };
export default Game;
