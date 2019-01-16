import { maps, tanks as tanksConfig } from './stageConfig';
import { START_TICKS, Direction, TankTypes } from './constants';
import { Flag, Entity } from './entities';
import TileMap, { rigid } from './tileMap';
import pool from './entityPool';
import Stage from './Stage';
import { main as mainScreen, dashboard } from './screens';
import { createSprite, squareIntersection } from './utils';

const GAME_OVER = false;

class Game {
	public stage;
	public lives;
	public sprites;
	public effects;

	constructor() {
		this.stage = new Stage(new TileMap(maps[0]), tanksConfig[0], 1);
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
			entity.update(deltaTime, this);
		});
		this.checkTileCollision();
		this.checkEntitiesCollision();

		// todo gameover

		const { tanks, number } = this.stage;

		if (!tanks.length && !pool.getEnemies().length) {
			// TODO fix some memory leak when all stages are finished
			const lvlNum = number + 1;
			this.stage = new Stage(new TileMap(maps[lvlNum]), tanksConfig[lvlNum], lvlNum);
			pool.add(new Flag());
		}

		this.stage.spawnEnemy();
		pool.removeFromQueue();
	}

	render() {
		mainScreen.clearScreen();
		dashboard.clearScreen();
		this.stage.draw();
		dashboard.draw(this.stage.number, this.lives, this.stage.tanks);
		if (this.stage.ticks < START_TICKS) {
			mainScreen.drawStartAnimation();
		}
	}

	//gameOver(){}

	//runIntro()

	//changeStage - stageTick, new
	//stageNum, new Map, new Tanks and pass game all around
	checkTileCollision() {
		pool.forEach(entity => {
			if (!(entity instanceof Entity) || entity.isDeath) return;

			if (entity.outOfScreen) {
				entity.resolveEdgeCollision();
			} else {
				const points = entity.getCollisionPoints();
				const tiles = this.stage.map.lookupMany(points);
				const collided = tiles.filter(tile => rigid.includes(tile.type)).length;

				if (collided) {
					entity.resolveTileCollision(tiles, this);
				}
			}
		});
	}

	checkEntitiesCollision() {
		pool.forEach(entity => {
			if (entity.isDeath) return;

			pool.forEach(other => {
				if (entity.id === other.id) return;
				if (squareIntersection(entity, other)) {
					entity.resolveEntityCollision(other, this, entity);
					other.resolveEntityCollision(entity, this, entity);
				}
			});
		});
	}

	async setupSprites(image) {
		const mainSprite = createSprite(image, mainScreen.context);
		const dashboardSprite = createSprite(image, dashboard.context);

		this.sprites = {
			player: {
				[Direction.top]: [mainSprite(0, 0, 16, 15), mainSprite(16, 0, 16, 15)],
				[Direction.bottom]: [mainSprite(64, 0, 16, 15), mainSprite(80, 0, 16, 15)],
				[Direction.right]: [mainSprite(96, 0, 16, 15), mainSprite(112, 0, 16, 15)],
				[Direction.left]: [mainSprite(32, 0, 16, 15), mainSprite(48, 0, 16, 15)],
			},
			bullet: {
				[Direction.top]: [mainSprite(322.25, 101.5, 5, 5.7)],
				[Direction.bottom]: [mainSprite(338.5, 101.5, 5, 5.7)],
				[Direction.right]: [mainSprite(345.75, 101.5, 5, 5.7)],
				[Direction.left]: [mainSprite(329.5, 101.5, 5, 5.7)],
			},
			enemies: {
				[TankTypes.default]: {
					[Direction.top]: [mainSprite(128, 0, 16, 15), mainSprite(144, 0, 16, 15)],
					[Direction.bottom]: [mainSprite(192, 0, 16, 15), mainSprite(208, 0, 16, 15)],
					[Direction.right]: [mainSprite(224, 0, 16, 15), mainSprite(240, 0, 16, 15)],
					[Direction.left]: [mainSprite(160, 0, 16, 15), mainSprite(176, 0, 16, 15)],
				},
				[TankTypes.fast]: {
					[Direction.top]: [mainSprite(128, 80, 16, 15), mainSprite(144, 80, 16, 15)],
					[Direction.bottom]: [mainSprite(192, 80, 16, 15), mainSprite(208, 80, 16, 15)],
					[Direction.right]: [mainSprite(224, 80, 16, 15), mainSprite(240, 80, 16, 15)],
					[Direction.left]: [mainSprite(160, 80, 16, 15), mainSprite(176, 80, 16, 15)],
				},
				[TankTypes.armored]: {
					[Direction.top]: [mainSprite(128.5, 111.75, 14.75, 16), mainSprite(144.25, 111.75, 14.75, 16)],
					[Direction.bottom]: [mainSprite(191.75, 111.75, 15.25, 16), mainSprite(207.5, 111.75, 15.25, 16)],
					[Direction.right]: [mainSprite(222.75, 111.75, 16, 16), mainSprite(239, 111.75, 14.75, 16)],
					[Direction.left]: [mainSprite(159, 111.75, 16, 16), mainSprite(174.75, 111.75, 16, 16)],
				},
				[`${TankTypes.armored}2`]: {
					[Direction.top]: [mainSprite(128.5, 175.75, 14.75, 16), mainSprite(144.25, 175.75, 14.75, 16)],
					[Direction.bottom]: [mainSprite(191.75, 175.75, 15.25, 16), mainSprite(207.5, 175.75, 15.25, 16)],
					[Direction.right]: [mainSprite(223.75, 175.75, 16, 16), mainSprite(239.75, 175.75, 14.75, 16)],
					[Direction.left]: [mainSprite(159, 175.75, 16, 16), mainSprite(174.75, 175.75, 16, 16)],
				},
				[`${TankTypes.armored}1`]: {
					[Direction.top]: [mainSprite(128.5, 175.75, 14.75, 16), mainSprite(144.25, 175.75, 14.75, 16)],
					[Direction.bottom]: [mainSprite(191.75, 175.75, 15.25, 16), mainSprite(207.5, 175.75, 15.25, 16)],
					[Direction.right]: [mainSprite(223.75, 175.75, 16, 16), mainSprite(239.75, 175.75, 14.75, 16)],
					[Direction.left]: [mainSprite(159, 175.75, 16, 16), mainSprite(174.75, 175.75, 16, 16)],
				},
				flag: mainSprite(304.5, 33, 16, 15.25),
				flagDeath: mainSprite(304, 33, 16, 15.25),
			},
			tankIcon: dashboardSprite(320.25, 192.75, 8.5, 7.75),
			flagIcon: dashboardSprite(375.5, 184, 17, 15),
			playerIcon: dashboardSprite(376.5, 144.5, 8, 8.5),
			numberIcons: [
				dashboardSprite(328, 184, 8, 7),
				dashboardSprite(336, 184, 8, 7),
				dashboardSprite(344, 184, 8, 7),
				dashboardSprite(352, 184, 8, 7),
				dashboardSprite(360, 184, 8, 7),
				dashboardSprite(328, 191, 8, 7),
				dashboardSprite(336, 191, 8, 7),
				dashboardSprite(344, 191, 8, 7),
				dashboardSprite(352, 191, 8, 7),
				dashboardSprite(360, 191, 8, 7),
			],
		};

		this.effects = {
			tankDeath: [
				{ sprite: mainSprite(336, 128.75, 32, 32), side: 80 },
				{ sprite: mainSprite(304.5, 128.75, 30.5, 31.25), side: 80 },
				{ sprite: mainSprite(288.25, 128.75, 16, 15.5), side: 40 },
				{ sprite: mainSprite(272.25, 128.75, 15.75, 14.25), side: 37 },
				{ sprite: mainSprite(258, 128.75, 13.75, 13.25), side: 35 },
			],
			tankSpawn: [
				{ sprite: mainSprite(257, 97, 15, 14), side: 35 },
				{ sprite: mainSprite(273, 97, 15, 14), side: 35 },
				{ sprite: mainSprite(288, 97, 15, 14), side: 35 },
				{ sprite: mainSprite(303, 97, 15, 14), side: 35 },
			],
		};
	}
}

export { GAME_OVER };
export default Game;
