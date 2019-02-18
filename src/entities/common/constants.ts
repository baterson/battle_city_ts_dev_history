export enum Direction {
	Top,
	Bottom,
	Right,
	Left,
}

// TODO: Tanks
export enum TankTypes {
	Default,
	Fast,
	Armored,
}

export enum Powerups {
	helmet,
	star,
	stopwatch,
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
export const ENEMY_TANK_VELOCITY = {
	[TankTypes.Default]: 160,
	[TankTypes.Fast]: 200,
	[TankTypes.Armored]: 120,
};
export const ENEMY_TANK_LIVES = {
	[TankTypes.Default]: 1,
	[TankTypes.Fast]: 1,
	[TankTypes.Armored]: 3,
};
export const TANK_DEATH_ANIMATION = 50;
export const TANK_SPAWN_ANIMATION = 50;
// export const TANK_DEATH_ANIMATION = 12;
// export const TANK_SPAWN_ANIMATION = 12;

export const PLAYER_SPAWN_POSITION = {
	x: 220,
	y: 560,
};
export const PLAYER_VELOCITY = 150;

// Powerups
export const FREEZE_DELAY = 300;
