import { maps, tanks as tanksConfig } from './stageConfig';
import { Powerups } from './entities/common';
import { setupSprites } from './utils';
import TileMap from './tileMap';
import entityManager from './entityManager';
import Stage from './Stage';
import { TimeManager } from './utils/TimeManager';
import { main as mainScreen, dashboard, main } from './screens';

// RENAME TO ANIM
const CHANGING_STAGE_TIME = 200;
const GAME_OVER_ANIM_TIME = 200;

class Game {
	public stage;
	public sprites;
	public effects;
	public ticks;
	public timeManager: TimeManager;
	public isLost: boolean;
	public deltaTime = 1 / 60; // TODO: Do something with it

	constructor(image) {
		this.sprites = setupSprites(image);
		this.ticks = 0;
		// TODO: parametrize with manager by generic
		this.timeManager = new TimeManager();
		this.isLost = false;
		entityManager.spawnEntity('Player');

		// entityManager.spawnEntity('powerup', this, 20, 500, Powerups.star);
		// entityManager.spawnEntity('powerup', this, 20, 300, Powerups.helmet);
		// entityManager.spawnEntity('powerup', this, 20, 200, Powerups.stopwatch);

		this.stage = new Stage(0, new TileMap(maps[0], this.sprites.tiles), tanksConfig[0]);
		this.stage.spawnEnemy(this);
		this.timeManager.setTimer('changingStage', CHANGING_STAGE_TIME);
		// entityManager.spawnEntity('Flag', this);
	}

	createLoop() {
		let accumulatedTime = 0;
		let lastTime = 0;
		const deltaTime = 1 / 60;

		const loop = time => {
			accumulatedTime += (time - lastTime) / 1000;
			while (accumulatedTime > deltaTime) {
				this.update();
				accumulatedTime -= deltaTime;
			}
			this.render();
			lastTime = time;
			requestAnimationFrame(loop);
		};
		loop(0);
	}

	update() {
		this.timeManager.decrementTimers();
		if (this.isLost) return;

		this.stage.update();
		entityManager.update(this);
		entityManager.checkCollisions(this);

		if (!entityManager.getPlayer()) {
			return this.gameOver();
		}

		if (this.stage.isFinish()) {
			this.toNextStage();
		} else {
			this.stage.spawnEnemy();
			// this.stage.spawnPowerup(this);
			entityManager.removeFromQueue();
		}
	}

	render() {
		const changingStageTime = this.timeManager.getTimer('changingStage');

		mainScreen.clearScreen();
		// dashboard.clearScreen();
		this.stage.render(this);
		// dashboard.render(this);
		if (changingStageTime) {
			mainScreen.renderChaingingStage(changingStageTime);
		} else if (this.isLost) {
			mainScreen.renderGameOver(this.timeManager.getTimer('gameOverAnim'), this.sprites.gameOver);
		} else {
			const player: any = entityManager.getPlayer();
			dashboard.clearScreen();
			dashboard.render(player.lives, this.stage.number + 1, this.stage.tanks, this.sprites);
		}
	}

	// render() {
	// const stageStarting = getStateRemainingTime('stageStarting', this, this);
	// const gameOverLeft = getStateRemainingTime('gameOver', this, this);
	// if (gameOverLeft < -1) {
	// 	mainScreen.clearScreen();
	// 	mainScreen.renderGameOver(gameOverLeft);
	// 	this.sprites.gameOver(200, 200, 200);
	// } else {
	// 	mainScreen.clearScreen();
	// 	dashboard.clearScreen();
	// 	this.stage.render(this);
	// 	dashboard.render(this);
	// }
	// if (gameOverLeft >= 0) {
	// 	mainScreen.renderGameOver(gameOverLeft);
	// }

	// if (stageStarting > 0) {
	// 	mainScreen.renderStageStarting(stageStarting);
	// }
	// }

	gameOver() {
		this.timeManager.setTimer('gameOverAnim', GAME_OVER_ANIM_TIME);
		this.isLost = true;
	}

	isWaitingForRestart() {
		const gameOverTime = this.timeManager.getTimer('gameOverAnim');
		return !gameOverTime && this.isLost;
	}

	getNextStageNum() {
		let newNum = this.stage.number + 1;
		if (newNum > maps.length - 1) {
			newNum = 0;
		}
		return newNum;
	}

	toNextStage() {
		this.timeManager.setTimer('changingStage', CHANGING_STAGE_TIME);
		const stageNum = this.getNextStageNum();
		const player: any = entityManager.getPlayer();
		this.stage = new Stage(stageNum, new TileMap(maps[stageNum], this.sprites.tiles), tanksConfig[stageNum]);
		player.respawn();
	}

	restart() {
		this.ticks = 0;
		this.isLost = false;
		entityManager.clear();
		this.timeManager.setTimer('changingStage', CHANGING_STAGE_TIME);
		entityManager.spawnEntity('Player');
		// entityManager.spawnEntity('flag', this);
		this.stage = new Stage(0, new TileMap(maps[0], this.sprites.tiles), tanksConfig[0]);
	}
}

export default Game;
