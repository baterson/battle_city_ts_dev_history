import { main, dashboard } from '../screens';
import { PlayerPower, Direction, TankTypes, PowerupTypes, Sprites, VariableSprites } from '../types';
import { Vector } from './Vector';
import { Tiles } from '../tileMap';

const createSprite = (image: HTMLImageElement, context: CanvasRenderingContext2D) => (
	dx: number,
	dy: number,
	dWidth: number,
	dHeight: number
) => (position: Vector, size: Vector) => {
	context.drawImage(image, dx, dy, dWidth, dHeight, position.x, position.y, size.x, size.y);
};

const setupSprites = (image: HTMLImageElement): Sprites => {
	const mainSprite = createSprite(image, main.context);
	const dashboardSprite = createSprite(image, dashboard.context);

	return {
		player: {
			[PlayerPower.Default]: {
				[Direction.Top]: [mainSprite(0, 0, 16, 15), mainSprite(16, 0, 16, 15)],
				[Direction.Bottom]: [mainSprite(64, 0, 16, 15), mainSprite(80, 0, 16, 15)],
				[Direction.Right]: [mainSprite(96, 0, 16, 15), mainSprite(112, 0, 16, 15)],
				[Direction.Left]: [mainSprite(32, 0, 16, 15), mainSprite(48, 0, 16, 15)],
			},
			[PlayerPower.First]: {
				[Direction.Top]: [mainSprite(0, 16, 16, 15), mainSprite(16, 16, 16, 15)],
				[Direction.Bottom]: [mainSprite(64, 16, 16, 15), mainSprite(80, 16, 16, 15)],
				[Direction.Right]: [mainSprite(96, 16, 16, 15), mainSprite(112, 16, 16, 15)],
				[Direction.Left]: [mainSprite(32, 16, 16, 15), mainSprite(48, 16, 16, 15)],
			},
			[PlayerPower.Second]: {
				[Direction.Top]: [mainSprite(0, 32, 16, 15), mainSprite(16, 32, 16, 15)],
				[Direction.Bottom]: [mainSprite(64, 32, 16, 15), mainSprite(80, 32, 16, 15)],
				[Direction.Right]: [mainSprite(96, 32, 16, 15), mainSprite(112, 32, 16, 15)],
				[Direction.Left]: [mainSprite(32, 32, 16, 15), mainSprite(48, 32, 16, 15)],
			},
		},
		enemy: {
			[TankTypes.Default]: {
				[Direction.Top]: [mainSprite(128, 0, 16, 15), mainSprite(144, 0, 16, 15)],
				[Direction.Bottom]: [mainSprite(192, 0, 16, 15), mainSprite(208, 0, 16, 15)],
				[Direction.Right]: [mainSprite(224, 0, 16, 15), mainSprite(240, 0, 16, 15)],
				[Direction.Left]: [mainSprite(160, 0, 16, 15), mainSprite(176, 0, 16, 15)],
			},
			[TankTypes.Fast]: {
				[Direction.Top]: [mainSprite(128, 80, 16, 15), mainSprite(144, 80, 16, 15)],
				[Direction.Bottom]: [mainSprite(192, 80, 16, 15), mainSprite(208, 80, 16, 15)],
				[Direction.Right]: [mainSprite(224, 80, 16, 15), mainSprite(240, 80, 16, 15)],
				[Direction.Left]: [mainSprite(160, 80, 16, 15), mainSprite(176, 80, 16, 15)],
			},
			[TankTypes.Armored]: {
				'1': {
					[Direction.Top]: [mainSprite(128.5, 111.75, 14.75, 16), mainSprite(144.25, 111.75, 14.75, 16)],
					[Direction.Bottom]: [mainSprite(191.75, 111.75, 15.25, 16), mainSprite(207.5, 111.75, 15.25, 16)],
					[Direction.Right]: [mainSprite(222.75, 111.75, 16, 16), mainSprite(239, 111.75, 14.75, 16)],
					[Direction.Left]: [mainSprite(159, 111.75, 16, 16), mainSprite(174.75, 111.75, 16, 16)],
				},
				'2': {
					[Direction.Top]: [mainSprite(128.5, 175.75, 14.75, 16), mainSprite(144.25, 175.75, 14.75, 16)],
					[Direction.Bottom]: [mainSprite(191.75, 175.75, 15.25, 16), mainSprite(207.5, 175.75, 15.25, 16)],
					[Direction.Right]: [mainSprite(223.75, 175.75, 16, 16), mainSprite(239.75, 175.75, 14.75, 16)],
					[Direction.Left]: [mainSprite(159, 175.75, 16, 16), mainSprite(174.75, 175.75, 16, 16)],
				},
				'3': {
					[Direction.Top]: [mainSprite(128.5, 175.75, 14.75, 16), mainSprite(144.25, 175.75, 14.75, 16)],
					[Direction.Bottom]: [mainSprite(191.75, 175.75, 15.25, 16), mainSprite(207.5, 175.75, 15.25, 16)],
					[Direction.Right]: [mainSprite(223.75, 175.75, 16, 16), mainSprite(239.75, 175.75, 14.75, 16)],
					[Direction.Left]: [mainSprite(159, 175.75, 16, 16), mainSprite(174.75, 175.75, 16, 16)],
				},
			},
		},
		bullet: {
			[Direction.Top]: [mainSprite(322.25, 101.5, 5, 5.7)],
			[Direction.Bottom]: [mainSprite(338.5, 101.5, 5, 5.7)],
			[Direction.Right]: [mainSprite(345.75, 101.5, 5, 5.7)],
			[Direction.Left]: [mainSprite(329.5, 101.5, 5, 5.7)],
		},
		flag: mainSprite(304.5, 33, 16, 15.25),
		flagDeath: mainSprite(304, 33, 16, 15.25),
		tankIcon: dashboardSprite(320.25, 192.75, 8.5, 7.75),
		flagIcon: dashboardSprite(375.5, 184, 17, 15),
		playerIcon: dashboardSprite(376.5, 144.5, 8, 8.5),
		numberIcons: [
			dashboardSprite(328.5, 184, 8, 7),
			dashboardSprite(336.5, 184, 8, 7),
			dashboardSprite(344.5, 184, 8, 7),
			dashboardSprite(352.5, 184, 8, 7),
			dashboardSprite(360.5, 184, 8, 7),
			dashboardSprite(328.5, 192, 8, 7),
			dashboardSprite(336.5, 192, 8, 7),
			dashboardSprite(344.5, 192, 8, 7),
			dashboardSprite(352.5, 192, 8, 7),
			dashboardSprite(360.5, 192, 8, 7),
		],
		tiles: {
			[Tiles.brick1]: mainSprite(256, 0, 8, 7),
			[Tiles.brick2]: mainSprite(264, 0, 8, 7),
			[Tiles.brick3]: mainSprite(256, 8, 8, 7),
			[Tiles.brick4]: mainSprite(264, 8, 8, 7),
			[Tiles.ice]: mainSprite(288, 32, 16, 15),
			[Tiles.grass]: mainSprite(272, 32, 16, 15),
		},
		gameOver: mainSprite(288.5, 184, 31.2, 16),
		powerup: {
			[PowerupTypes.Helmet]: mainSprite(255.5, 112, 16, 14),
			[PowerupTypes.Stopwatch]: mainSprite(271.5, 112, 16, 14),
			[PowerupTypes.Star]: mainSprite(303.5, 112, 16, 14),
			[PowerupTypes.Grenade]: mainSprite(319.5, 112, 16, 14),
			[PowerupTypes.Tank]: mainSprite(335.5, 112, 16, 14),
		},
		invincible: [mainSprite(256, 144, 15.7, 16), mainSprite(272.2, 144, 15.7, 16)],
	};
};

const setupVariableSprites = (image: HTMLImageElement): VariableSprites => {
	const mainSprite = createSprite(image, main.context);

	return {
		tankSpawn: [
			{ sprite: mainSprite(303, 97, 15, 14), size: new Vector(35, 35) },
			{ sprite: mainSprite(303, 97, 15, 14), size: new Vector(35, 35) },
			{ sprite: mainSprite(288, 97, 15, 14), size: new Vector(35, 35) },
			{ sprite: mainSprite(273, 97, 15, 14), size: new Vector(35, 35) },
			{ sprite: mainSprite(257, 97, 15, 14), size: new Vector(35, 35) },
		],
		tankDestruction: [
			{ sprite: mainSprite(336, 128.75, 32, 32), size: new Vector(80, 80) },
			{ sprite: mainSprite(304.5, 128.75, 30.5, 31.25), size: new Vector(80, 80) },
			{ sprite: mainSprite(288.25, 128.75, 16, 15.5), size: new Vector(40, 40) },
			{ sprite: mainSprite(272.25, 128.75, 15.75, 14.25), size: new Vector(37, 37) },
			{ sprite: mainSprite(258, 128.75, 13.75, 13.25), size: new Vector(35, 35) },
		],
	};
};

class AssetsHolder {
	public image: HTMLImageElement;
	public audio;
	public sprites: Sprites;
	public variableSprites: VariableSprites;

	loadSprite(src) {
		return new Promise((resolve, reject) => {
			const image: any = new Image();
			image.addEventListener('load', () => {
				this.image = image;
				this.sprites = setupSprites(image);
				this.variableSprites = setupVariableSprites(image);
				resolve();
			});
			image.src = src;
		});
	}

	loadAudio(audio) {
		this.audio = audio;
	}
}

export const assetsHolder = new AssetsHolder();
