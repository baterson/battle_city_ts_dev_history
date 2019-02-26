import { Vector } from './utils';

export enum Direction {
	Top,
	Bottom,
	Right,
	Left,
}

export enum TankTypes {
	Default,
	Fast,
	Armored,
	Armored2,
	Armored3,
}

export enum PowerupTypes {
	Helmet,
	Star,
	Stopwatch,
	Grenade,
	Tank,
}

export enum PlayerPower {
	Default,
	First,
	Second,
}

enum Tiles {
	none,
	brick1,
	brick2,
	brick3,
	brick4,
	ice,
	grass,
}

interface Game {}

export type VectorArgs = [number, number];

export type PlayerStats = { [key in PlayerPower]: { velocity: number; shotCD: number } };

export type EnemyStats = { [key in TankTypes]: { velocity: number; shotCD: number; lives: number } };

export interface Entity {
	update(game: Game): void;
	render(game: Game): void;
	getBoundingBox(): void;
	resolveEntityCollision(other, game: Game): void;
}

export interface Movable {
	animateMovement(sprites): void;
	move(velocity: number): void;
	isOutOfScreen(): void;
	getFrontCollisionPoints(): void;
	resolveEdgeCollision(): void;
	// TODO: Tile types
	resolveTileCollision(tiles, game): void;
}

export interface Tank {
	destroy(): void;
	shot(cd: number): void;
	goBack(): void;
}

export interface Bullet extends Movable {}

export interface Player extends Movable, Tank {
	processInput(game: Game): void;
	respawn(): void;
}

export interface Enemy extends Movable, Tank {
	aiMove(game: Game): void;
	setRandomDirection(): void;
	setOpositeDirection(): void;
}

// Sprites
type sprite = (position: Vector, size: Vector) => void;
type directionSprites = { [key in Direction]: sprite[] };

export interface Sprites {
	player: {
		[PlayerPower.Default]: directionSprites;
		[PlayerPower.First]: directionSprites;
		[PlayerPower.Second]: directionSprites;
	};
	enemy: {
		[TankTypes.Default]: directionSprites;
		[TankTypes.Fast]: directionSprites;
		[TankTypes.Armored]: {
			'1': directionSprites;
			'2': directionSprites;
			'3': directionSprites;
		};
	};
	bullet: directionSprites;
	flag: sprite;
	flagDeath: sprite;
	tankIcon: sprite;
	flagIcon: sprite;
	playerIcon: sprite;
	numberIcons: sprite[];
	tiles: Partial<{ [key in Tiles]: sprite }>;
	gameOver: sprite;
	powerup: { [key in PowerupTypes]: sprite };
	tankDeathAnimation: sprite[];
	tankSpawnAnimation: sprite[];
	invincible: sprite[];
}
