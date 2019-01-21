import { main, dashboard } from '../screens';
import { Direction, TankTypes } from '../entities/common';
import { Tiles } from '../tileMap';

const createSprite = (image, context) => (dx, dy, dWidth, dHeight) => (x, y, side) => {
	context.drawImage(image, dx, dy, dWidth, dHeight, x, y, side, side);
};

const setupSprites = image => {
	const mainSprite = createSprite(image, main.context);
	const dashboardSprite = createSprite(image, dashboard.context);

	return {
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
		enemy: {
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
			[`${TankTypes.armored}3`]: {
				[Direction.top]: [mainSprite(128.5, 175.75, 14.75, 16), mainSprite(144.25, 175.75, 14.75, 16)],
				[Direction.bottom]: [mainSprite(191.75, 175.75, 15.25, 16), mainSprite(207.5, 175.75, 15.25, 16)],
				[Direction.right]: [mainSprite(223.75, 175.75, 16, 16), mainSprite(239.75, 175.75, 14.75, 16)],
				[Direction.left]: [mainSprite(159, 175.75, 16, 16), mainSprite(174.75, 175.75, 16, 16)],
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
		},
		tankSpawnAnimation: [
			{ sprite: mainSprite(257, 97, 15, 14), side: 35 },
			{ sprite: mainSprite(273, 97, 15, 14), side: 35 },
			{ sprite: mainSprite(288, 97, 15, 14), side: 35 },
			{ sprite: mainSprite(303, 97, 15, 14), side: 35 },
		],
		tankDeathAnimation: [
			{ sprite: mainSprite(336, 128.75, 32, 32), side: 80 },
			{ sprite: mainSprite(304.5, 128.75, 30.5, 31.25), side: 80 },
			{ sprite: mainSprite(288.25, 128.75, 16, 15.5), side: 40 },
			{ sprite: mainSprite(272.25, 128.75, 15.75, 14.25), side: 37 },
			{ sprite: mainSprite(258, 128.75, 13.75, 13.25), side: 35 },
		],
		flag: mainSprite(304.5, 33, 16, 15.25),
		flagDeath: mainSprite(304, 33, 16, 15.25),
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
		tiles: {
			[Tiles.brick1]: mainSprite(256, 0, 8, 7),
			[Tiles.brick2]: mainSprite(264, 0, 8, 7),
			[Tiles.brick3]: mainSprite(256, 8, 8, 7),
			[Tiles.brick4]: mainSprite(264, 8, 8, 7),
			[Tiles.ice]: mainSprite(288, 32, 16, 15),
			[Tiles.grass]: mainSprite(272, 32, 16, 15),
		},
		gameOver: mainSprite(288.5, 184, 31.2, 16),
	};
};

export { setupSprites, createSprite };
