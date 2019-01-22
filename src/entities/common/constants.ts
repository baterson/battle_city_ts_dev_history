export enum Direction {
	top,
	bottom,
	right,
	left,
}

// TODO: Tanks
export enum TankTypes {
	default,
	fast,
	armored,
}

export enum Powerups {
	helmet,
	stopwatch,
	shovel,
	star,
	grenade,
	tank,
}

// BULLET
export const BULLET_SIDE = 10;
export const BULLET_VELOCITY = 350;
export const SHOT_DELAY = 200;
// export const SHOT_DELAY = 20;

// TANKS
export const TANK_SIDE = 35;
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
export const TANK_DEATH_TIMER = 11;
export const TANK_SPAWN_TIMER = 11;

export const PLAYER_SPAWN_POSITION = {
	x: 220,
	y: 560,
};
export const PLAYER_VELOCITY = 150;

// Powerups
export const FREEZE_DELAY = 300;
