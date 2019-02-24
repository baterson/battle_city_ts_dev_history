import { maps, tanks as tanksConfig } from './stageConfig';
import { DELTA_TIME } from './constants';
import { PowerupTypes } from './types';
import { Vector } from './utils';
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
	public audio;
	public effects;
	public timeManager: TimeManager;
	public isLost: boolean;

	constructor(sprites, audio) {
		this.sprites = sprites;
		this.audio = audio;
		this.isLost = false;
		// TODO: parametrize with manager by generic
		this.timeManager = new TimeManager();
		this.stage = new Stage(0, new TileMap(maps[0], this.sprites.tiles), tanksConfig[0]);
		this.timeManager.setTimer('changingStage', CHANGING_STAGE_TIME);
		entityManager.spawnEntity('Player');
	}

	createLoop() {
		let accumulatedTime = 0;
		let lastTime = 0;

		const loop = time => {
			accumulatedTime += (time - lastTime) / 1000;
			while (accumulatedTime > DELTA_TIME) {
				this.update();
				accumulatedTime -= DELTA_TIME;
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
		entityManager.removeFromQueue();

		if (!entityManager.getPlayer()) {
			return this.gameOver();
		}

		if (this.stage.isFinish()) {
			this.toNextStage();
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
		this.isLost = false;
		entityManager.clear();
		this.timeManager.setTimer('changingStage', CHANGING_STAGE_TIME);
		entityManager.spawnEntity('Player');
		this.stage = new Stage(0, new TileMap(maps[0], this.sprites.tiles), tanksConfig[0]);
	}
}

export default Game;
