// Stage
import Sprite from './Sprite';

export enum Direction {
	top,
	bottom,
	right,
	left,
}

export enum TankTypes {
	default,
	fast,
	armored,
}

// STAGE
export const START_TICKS = 10;
export const STAGE_SPAWN_TIMER = 100;
export const STAGE_SPAWN_RETRY_TIMER = 30;
export const ENEMY_SPAWN_POSITION = [[0, 0], [560, 0]];

// Player
export const PLAYER_SPAWN_POSITION = [220, 560];
export const PLAYER_SPRITES = {
	[Direction.top]: [new Sprite(0, 0, 16, 15), new Sprite(16, 0, 16, 15)],
	[Direction.bottom]: [new Sprite(64, 0, 16, 15), new Sprite(80, 0, 16, 15)],
	[Direction.right]: [new Sprite(96, 0, 16, 15), new Sprite(112, 0, 16, 15)],
	[Direction.left]: [new Sprite(32, 0, 16, 15), new Sprite(48, 0, 16, 15)],
};

// BULLET
export const BULLET_SIDE = 10;
export const BULLET_VELOCITY = 350;
export const BULLET_SPRITES = {
	[Direction.top]: [new Sprite(322.25, 101.5, 5, 5.7)],
	[Direction.bottom]: [new Sprite(338.5, 101.5, 5, 5.7)],
	[Direction.right]: [new Sprite(345.75, 101.5, 5, 5.7)],
	[Direction.left]: [new Sprite(329.5, 101.5, 5, 5.7)],
};

// TANKS
// TODO: build by map
export const TANK_SIDE = 35;
export const TANK_DEATH_SPRITES = [
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(336, 128.75, 32, 32), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(304.5, 128.75, 30.5, 31.25), side: 80 },
	{ sprite: new Sprite(288.25, 128.75, 16, 15.5), side: 40 },
	{ sprite: new Sprite(288.25, 128.75, 16, 15.5), side: 40 },
	{ sprite: new Sprite(288.25, 128.75, 16, 15.5), side: 40 },
	{ sprite: new Sprite(272.25, 128.75, 15.75, 14.25), side: 37 },
	{ sprite: new Sprite(272.25, 128.75, 15.75, 14.25), side: 37 },
	{ sprite: new Sprite(272.25, 128.75, 15.75, 14.25), side: 37 },
	{ sprite: new Sprite(258, 128.75, 13.75, 13.25), side: 35 },
	{ sprite: new Sprite(258, 128.75, 13.75, 13.25), side: 35 },
	{ sprite: new Sprite(258, 128.75, 13.75, 13.25), side: 35 },
];
export const TANK_SPAWN_SPRITES = [
	{ sprite: new Sprite(257, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(257, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(257, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(257, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(273, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(273, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(273, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(273, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(288, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(288, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(288, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(288, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(303, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(303, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(303, 97, 15, 14), side: 35 },
	{ sprite: new Sprite(303, 97, 15, 14), side: 35 },
];
export const TANK_SPRITES = {
	[TankTypes.default]: {
		[Direction.top]: [new Sprite(128, 0, 16, 15), new Sprite(144, 0, 16, 15)],
		[Direction.bottom]: [new Sprite(192, 0, 16, 15), new Sprite(208, 0, 16, 15)],
		[Direction.right]: [new Sprite(224, 0, 16, 15), new Sprite(240, 0, 16, 15)],
		[Direction.left]: [new Sprite(160, 0, 16, 15), new Sprite(176, 0, 16, 15)],
	},
	[TankTypes.fast]: {
		[Direction.top]: [new Sprite(128, 80, 16, 15), new Sprite(144, 80, 16, 15)],
		[Direction.bottom]: [new Sprite(192, 80, 16, 15), new Sprite(208, 80, 16, 15)],
		[Direction.right]: [new Sprite(224, 80, 16, 15), new Sprite(240, 80, 16, 15)],
		[Direction.left]: [new Sprite(160, 80, 16, 15), new Sprite(176, 80, 16, 15)],
	},
	[TankTypes.armored]: {
		[Direction.top]: [new Sprite(128.5, 111.75, 14.75, 16), new Sprite(144.25, 111.75, 14.75, 16)],
		[Direction.bottom]: [new Sprite(191.75, 111.75, 15.25, 16), new Sprite(207.5, 111.75, 15.25, 16)],
		[Direction.right]: [new Sprite(222.75, 111.75, 16, 16), new Sprite(239, 111.75, 14.75, 16)],
		[Direction.left]: [new Sprite(159, 111.75, 16, 16), new Sprite(174.75, 111.75, 16, 16)],
	},
	[`${TankTypes.armored}2`]: {
		[Direction.top]: [new Sprite(128.5, 175.75, 14.75, 16), new Sprite(144.25, 175.75, 14.75, 16)],
		[Direction.bottom]: [new Sprite(191.75, 175.75, 15.25, 16), new Sprite(207.5, 175.75, 15.25, 16)],
		[Direction.right]: [new Sprite(223.75, 175.75, 16, 16), new Sprite(239.75, 175.75, 14.75, 16)],
		[Direction.left]: [new Sprite(159, 175.75, 16, 16), new Sprite(174.75, 175.75, 16, 16)],
	},
	[`${TankTypes.armored}1`]: {
		[Direction.top]: [new Sprite(128.5, 175.75, 14.75, 16), new Sprite(144.25, 175.75, 14.75, 16)],
		[Direction.bottom]: [new Sprite(191.75, 175.75, 15.25, 16), new Sprite(207.5, 175.75, 15.25, 16)],
		[Direction.right]: [new Sprite(223.75, 175.75, 16, 16), new Sprite(239.75, 175.75, 14.75, 16)],
		[Direction.left]: [new Sprite(159, 175.75, 16, 16), new Sprite(174.75, 175.75, 16, 16)],
	},
};
export const TANK_VELOCITY = {
	[TankTypes.default]: 160,
	[TankTypes.fast]: 200,
	[TankTypes.armored]: 120,
};
export const TANK_LIVES = {
	[TankTypes.default]: 1,
	[TankTypes.fast]: 1,
	[TankTypes.armored]: 3,
};
export const TANK_DEATH_TIMER = TANK_DEATH_SPRITES.length - 1;
export const TANK_SPAWN_TIMER = TANK_SPAWN_SPRITES.length - 1;

// FLAG
export const FLAG_SPRITE = new Sprite(304.5, 33, 16, 15.25);
export const FLAG_DEATH_SPRITE = new Sprite(304, 33, 16, 15.25);
