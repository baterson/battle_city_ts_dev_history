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

export enum SpriteNames {
	player,
	enemies,
	bullet,
}

// STAGE
export const START_TICKS = 10;
export const STAGE_SPAWN_DELAY = 100;
export const ENEMY_SPAWN_POSITION = [[0, 0], [560, 0]];

export const PLAYER_SPAWN_POSITION = [220, 560];

// BULLET
export const BULLET_SIDE = 10;
export const BULLET_VELOCITY = 350;

// TANKS
// TODO: build by map
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
// export const TANK_DEATH_TIMER = TANK_DEATH_SPRITES.length - 1;
// export const TANK_SPAWN_TIMER = TANK_SPAWN_SPRITES.length - 1;
