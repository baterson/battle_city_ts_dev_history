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
