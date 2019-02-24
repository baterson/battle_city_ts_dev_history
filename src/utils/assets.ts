import { main, dashboard } from '../screens';
import { PlayerPower, Direction, TankTypes, PowerupTypes } from '../types';
import { Vector } from './Vector';
import { Tiles } from '../tileMap';

// TODO: Types
export const createSprite = (image, context) => (dx, dy, dWidth, dHeight) => (position: Vector, size: Vector) => {
	context.drawImage(image, dx, dy, dWidth, dHeight, position.x, position.y, size.x, size.y);
};

export const setupSprites = image => {
	const mainSprite = createSprite(image, main.context);
	const dashboardSprite = createSprite(image, dashboard.context);

	return {
		[`player${PlayerPower.Default}`]: {
			[Direction.Top]: [mainSprite(0, 0, 16, 15), mainSprite(16, 0, 16, 15)],
			[Direction.Bottom]: [mainSprite(64, 0, 16, 15), mainSprite(80, 0, 16, 15)],
			[Direction.Right]: [mainSprite(96, 0, 16, 15), mainSprite(112, 0, 16, 15)],
			[Direction.Left]: [mainSprite(32, 0, 16, 15), mainSprite(48, 0, 16, 15)],
		},
		[`player${PlayerPower.First}`]: {
			[Direction.Top]: [mainSprite(0, 16, 16, 15), mainSprite(16, 16, 16, 15)],
			[Direction.Bottom]: [mainSprite(64, 16, 16, 15), mainSprite(80, 16, 16, 15)],
			[Direction.Right]: [mainSprite(96, 16, 16, 15), mainSprite(112, 16, 16, 15)],
			[Direction.Left]: [mainSprite(32, 16, 16, 15), mainSprite(48, 16, 16, 15)],
		},
		[`player${PlayerPower.Second}`]: {
			[Direction.Top]: [mainSprite(0, 32, 16, 15), mainSprite(16, 32, 16, 15)],
			[Direction.Bottom]: [mainSprite(64, 32, 16, 15), mainSprite(80, 32, 16, 15)],
			[Direction.Right]: [mainSprite(96, 32, 16, 15), mainSprite(112, 32, 16, 15)],
			[Direction.Left]: [mainSprite(32, 32, 16, 15), mainSprite(48, 32, 16, 15)],
		},
		bullet: {
			[Direction.Top]: [mainSprite(322.25, 101.5, 5, 5.7)],
			[Direction.Bottom]: [mainSprite(338.5, 101.5, 5, 5.7)],
			[Direction.Right]: [mainSprite(345.75, 101.5, 5, 5.7)],
			[Direction.Left]: [mainSprite(329.5, 101.5, 5, 5.7)],
		},
		[`enemy${TankTypes.Default}1`]: {
			[Direction.Top]: [mainSprite(128, 0, 16, 15), mainSprite(144, 0, 16, 15)],
			[Direction.Bottom]: [mainSprite(192, 0, 16, 15), mainSprite(208, 0, 16, 15)],
			[Direction.Right]: [mainSprite(224, 0, 16, 15), mainSprite(240, 0, 16, 15)],
			[Direction.Left]: [mainSprite(160, 0, 16, 15), mainSprite(176, 0, 16, 15)],
		},
		[`enemy${TankTypes.Fast}1`]: {
			[Direction.Top]: [mainSprite(128, 80, 16, 15), mainSprite(144, 80, 16, 15)],
			[Direction.Bottom]: [mainSprite(192, 80, 16, 15), mainSprite(208, 80, 16, 15)],
			[Direction.Right]: [mainSprite(224, 80, 16, 15), mainSprite(240, 80, 16, 15)],
			[Direction.Left]: [mainSprite(160, 80, 16, 15), mainSprite(176, 80, 16, 15)],
		},
		[`enemy${TankTypes.Armored}1`]: {
			[Direction.Top]: [mainSprite(128.5, 111.75, 14.75, 16), mainSprite(144.25, 111.75, 14.75, 16)],
			[Direction.Bottom]: [mainSprite(191.75, 111.75, 15.25, 16), mainSprite(207.5, 111.75, 15.25, 16)],
			[Direction.Right]: [mainSprite(222.75, 111.75, 16, 16), mainSprite(239, 111.75, 14.75, 16)],
			[Direction.Left]: [mainSprite(159, 111.75, 16, 16), mainSprite(174.75, 111.75, 16, 16)],
		},
		[`enemy${TankTypes.Armored}2`]: {
			[Direction.Top]: [mainSprite(128.5, 175.75, 14.75, 16), mainSprite(144.25, 175.75, 14.75, 16)],
			[Direction.Bottom]: [mainSprite(191.75, 175.75, 15.25, 16), mainSprite(207.5, 175.75, 15.25, 16)],
			[Direction.Right]: [mainSprite(223.75, 175.75, 16, 16), mainSprite(239.75, 175.75, 14.75, 16)],
			[Direction.Left]: [mainSprite(159, 175.75, 16, 16), mainSprite(174.75, 175.75, 16, 16)],
		},
		[`enemy${TankTypes.Armored}3`]: {
			[Direction.Top]: [mainSprite(128.5, 175.75, 14.75, 16), mainSprite(144.25, 175.75, 14.75, 16)],
			[Direction.Bottom]: [mainSprite(191.75, 175.75, 15.25, 16), mainSprite(207.5, 175.75, 15.25, 16)],
			[Direction.Right]: [mainSprite(223.75, 175.75, 16, 16), mainSprite(239.75, 175.75, 14.75, 16)],
			[Direction.Left]: [mainSprite(159, 175.75, 16, 16), mainSprite(174.75, 175.75, 16, 16)],
		},
		tankDeathAnimation: [
			mainSprite(336, 128.75, 32, 32),
			mainSprite(304.5, 128.75, 30.5, 31.25),
			mainSprite(288.25, 128.75, 16, 15.5),
			mainSprite(272.25, 128.75, 15.75, 14.25),
			mainSprite(258, 128.75, 13.75, 13.25),
			mainSprite(258, 128.75, 13.75, 13.25),
		],
		tankSpawnAnimation: [
			mainSprite(303, 97, 15, 14),
			mainSprite(303, 97, 15, 14),
			mainSprite(288, 97, 15, 14),
			mainSprite(273, 97, 15, 14),
			mainSprite(257, 97, 15, 14),
			mainSprite(257, 97, 15, 14),
		],
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

export const getAnimIndex = (animationLength: number, framesLeft: number, spritesLength: number) => {
	const step = animationLength / spritesLength;
	return Math.floor(framesLeft / step);
};

export const setupAudio = (audio: { [key: string]: string }): { [key: string]: typeof Audio } => {
	return Object.keys(audio).reduce((acc, current) => {
		acc[current] = new Audio(audio[current]);
		return acc;
	}, {});
};
