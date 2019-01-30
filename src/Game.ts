import { maps, tanks as tanksConfig } from './stageConfig';
import { Powerups } from './entities/common';
import { setupSprites, idGen } from './utils';
import { START_TICKS } from './Stage';
import TileMap from './tileMap';
import entityManager from './entityManager';
import Stage from './Stage';
import { main as mainScreen, dashboard } from './screens';

const GAME_OVER_TICKS = 301;

class Game {
	public stage;
	public sprites;
	public effects;
	public ticks;
	public gameOverTime;
	public deltaTime;
	public elapsedTime;

	constructor(image) {
		this.sprites = setupSprites(image);
		this.ticks = 0;
		this.deltaTime = 1 / 60;
		this.elapsedTime = 0;
		entityManager.spawnEntity('player', this);

		entityManager.spawnEntity('powerup', this, 20, 500, Powerups.tank);

		this.stage = new Stage(new TileMap(maps[0], this.sprites.tiles), tanksConfig[0], 0, this.ticks);
	}

	createLoop() {
		let accumulatedTime = 0;
		let lastTime = 0;

		const loop = time => {
			accumulatedTime += (time - lastTime) / 1000;
			while (accumulatedTime > this.deltaTime) {
				this.update();
				this.checkCurrentState();
				this.render();
				accumulatedTime -= this.deltaTime;
				this.elapsedTime += this.deltaTime;
			}
			lastTime = time;
			requestAnimationFrame(loop);
		};
		loop(0);
	}

	update() {
		// if (this.gameOverTick) return;
		entityManager.update(this);
		entityManager.checkTileCollision(this);
		entityManager.checkEntitiesCollision(this);
	}

	checkCurrentState() {
		// if (this.gameOverTick) return;
		const { tanks, number } = this.stage;
		const player = entityManager.getPlayer();

		// if (entityManager.getEnemies().length < 3) {
		// 	// TODO: Remove
		// 	this.stage.spawnEnemy(this);
		// }

		if (!tanks.length && !entityManager.getEnemies().length) {
			// TODO: assemble stage
			const gtageNum = this.getNextStageNum();
			this.stage = new Stage(
				new TileMap(maps[gtageNum], this.sprites.tiles),
				tanksConfig[gtageNum],
				gtageNum,
				this.elapsedTime
			);
			entityManager.spawnEntity('flag', this);
			player.respawn(this);
		} else {
			// this.stage.spawnEnemy(game);
			// this.stage.spawnPowerup(this);
			entityManager.removeFromQueue();
		}

		if (!player) {
			return this.gameOver();
		}
	}

	render() {
		// if (this.gameOverTick) {
		// 	return this.renderGameOver();
		// }
		mainScreen.clearScreen();
		dashboard.clearScreen();
		this.stage.render(this);
		dashboard.render(this);
		// if (tickDiff < START_TICKS) {
		// 	mainScreen.renderStageStarting(tickDiff);
		// }
	}

	renderGameOver() {
		// const gameOverTicks = this.ticks - this.gameOverTick;
		// if (gameOverTicks < GAME_OVER_TICKS) {
		// 	mainScreen.context.fillRect(0, 0, 600, gameOverTicks);
		// 	mainScreen.context.fillRect(0, 600 - gameOverTicks, 600, gameOverTicks);
		// } else {
		// 	mainScreen.clearScreen();
		// 	mainScreen.context.fillRect(0, 0, 600, gameOverTicks);
		// 	mainScreen.context.fillRect(0, 600 - gameOverTicks, 600, gameOverTicks);
		// 	this.sprites.gameOver(200, 200, 200);
		// }
	}

	gameOver() {
		this.gameOverTime = this.elapsedTime;
	}

	isLost() {
		// return this.gameOverTick && this.ticks - this.gameOverTick >= GAME_OVER_TICKS;
	}

	getNextStageNum() {
		let newNum = this.stage.number + 1;
		if (newNum > maps.length - 1) {
			newNum = 0;
		}
		return newNum;
	}

	restart() {
		entityManager.clear();
		idGen.reset();
		this.ticks = 0;
		// this.gameOverTick = null;
		entityManager.spawnEntity('player', this);
		this.stage = new Stage(new TileMap(maps[0], this.sprites.tiles), tanksConfig[0], 1, this.ticks);
	}
}

export default Game;
