import * as types from './types';

// Game
export const DELTA_TIME = 1 / 60;

// Entities
export const TANK_SIZE: types.VectorArgs = [35, 35];
export const PLAYER_SPAWN_POSITION: types.VectorArgs = [20, 550];
export const BULLET_SIZE: types.VectorArgs = [10, 10];
export const BULLET_VELOCITY = 300;
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
export const DEATH_FRAMES = 200;
export const SPAWN_FRAMES = 200;
export const INVINCIBLE_FRAMES = 200;
export const FREEZE_FRAMES = 100;
export const POWERUP_SPAWN_CD = 30;
export const ENEMY_SPAWN_CD = 500;

// Stage
export const ENEMY_SPAWN_POSITION: types.VectorArgs[] = [[0, 0], [560, 0]];