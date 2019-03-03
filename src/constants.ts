import * as types from './types';

// Game
export const DELTA_TIME = 1 / 60;

// Entities
export const TANK_SIZE = { x: 35, y: 35 };
export const PLAYER_SPAWN_POSITION = { x: 20, y: 550 };
export const BULLET_SIZE = { x: 10, y: 10 };
export const BULLET_VELOCITY = 300;
export const POWERUP_SIZE = { x: 35, y: 35 };
export const PLAYER_STATS: types.PlayerStats = {
	[types.PlayerPower.Default]: {
		velocity: 100,
		shotCD: 50,
	},
	[types.PlayerPower.First]: {
		velocity: 120,
		shotCD: 40,
	},
	[types.PlayerPower.Second]: {
		velocity: 150,
		shotCD: 30,
	},
};
export const ENEMY_STATS = {
	[types.TankTypes.Default]: {
		velocity: 100,
		shotCD: 150,
		lives: 1,
	},
	[types.TankTypes.Fast]: {
		velocity: 200,
		shotCD: 120,
		lives: 1,
	},
	[types.TankTypes.Armored]: {
		velocity: 90,
		shotCD: 100,
		lives: 3,
	},
};

// Timers
export const DEATH_FRAMES = 50;
export const SPAWN_FRAMES = 50;
export const INVINCIBLE_FRAMES = 100;
export const FREEZE_FRAMES = 100;
export const POWERUP_SPAWN_CD = 30;
export const ENEMY_SPAWN_CD = 400;
export const CHANGING_STAGE_FRAMES = 200;
export const GAME_OVER_FRAMES = 200;

// Stage
export const ENEMY_SPAWN_POSITION = [{ x: 0, y: 0 }, { x: 560, y: 0 }];

// Map
export const TILE_SIDE = 20;
