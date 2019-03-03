import { maps, tanks as tanksConfig } from './stageConfig';
import { DELTA_TIME, CHANGING_STAGE_FRAMES, GAME_OVER_FRAMES } from './constants';
import { PowerupTypes } from './types';
import { assetsHolder } from './utils';
import { TileMap } from './TileMap';
import { Stage } from './Stage';
import { main as mainScreen, dashboard } from './screens';
import { SoundManager, TimeManager, entityManager } from './managers';

export class Game {
	public stage: Stage;
	public isLost: boolean;
	public timeManager: TimeManager<'changingStage' | 'gameOverAnim'>;
	public soundManager: SoundManager<'start'>;

	constructor() {
		this.isLost = false;
		this.timeManager = new TimeManager();
		this.soundManager = new SoundManager(['start']);

		this.stage = new Stage(0, new TileMap(maps[0]), tanksConfig[0]);
		this.timeManager.setTimer('changingStage', CHANGING_STAGE_FRAMES);

		// this.soundManager.play('start') TODO: run screen before game

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
		entityManager.update();
		entityManager.checkCollisions(this.stage.map);
		entityManager.removeFromQueue();

		if (!entityManager.getPlayer()) {
			return this.gameOver();
		}

		// if (this.stage.isFinish()) {
		// 	this.toNextStage();
		// }

		// TODO: if flag is gone
	}

	render() {
		const changingStageTime = this.timeManager.getTimer('changingStage');

		mainScreen.clearScreen();
		this.stage.render();
		if (changingStageTime) {
			mainScreen.renderChaingingStage(changingStageTime);
		} else if (this.isLost) {
			mainScreen.renderGameOver(this.timeManager.getTimer('gameOverAnim'));
		} else {
			const player: any = entityManager.getPlayer();
			dashboard.clearScreen();
			dashboard.render(player.lives, this.stage.screenNum, this.stage.tanks);
		}
	}

	gameOver() {
		this.timeManager.setTimer('gameOverAnim', GAME_OVER_FRAMES);
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
		this.timeManager.setTimer('changingStage', CHANGING_STAGE_FRAMES);
		const stageNum = this.getNextStageNum();
		const player: any = entityManager.getPlayer();
		this.stage = new Stage(stageNum, new TileMap(maps[stageNum]), tanksConfig[stageNum]);
		player.respawn();
	}

	restart() {
		this.isLost = false;
		entityManager.clear();
		this.timeManager.setTimer('changingStage', CHANGING_STAGE_FRAMES);
		entityManager.spawnEntity('Player');
		this.stage = new Stage(0, new TileMap(maps[0]), tanksConfig[0]);
		this.soundManager.play('start');
	}
}
