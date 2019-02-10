import {
	Direction,
	goBack,
	getCollisionPoints,
	isOutOfScreen,
	shot,
	move,
	PLAYER_SPAWN_POSITION,
	PLAYER_VELOCITY,
	TANK_SIDE,
	Powerups,
	getStateRemainingTime,
} from './common';
import keyboard, { Keys } from '../keyboard';
import { powerupEvents } from './powerup';
import entityManager from '../entityManager';

class Vector {
	public default: string[];

	constructor(public x, public y) {
		this.x = x;
		this.y = y;
		this.default = [x, y];
	}

	toDefault() {
		[this.x, this.y] = this.default;
	}
}

function move() {
	this.position.x = this.velocity.x * this.acceleration;
	this.position.y = this.velocity.y * this.acceleration;
}

function handleInput() {
	this.prevPosition = this.position;
	this.velocity.toDefault();
	const key = keyboard.getKey();

	if (key === Keys.ArrowUp) {
		this.velocity.y = -1;
	} else if (key === Keys.ArrowDown) {
		this.velocity.y = 1;
	} else if (key === Keys.ArrowLeft) {
		this.velocity.x = -1;
	} else if (key === Keys.ArrowRight) {
		this.velocity.x = 1;
	} else if (key === Keys.Space) {
		// this.shot(game);
	}
}

export function player(id, game) {
	// TODO: getstate/setstate bind inside constructor
	const entity = {
		type: 'player',
		id,
		position: new Vector(20, 30),
		prevPosition: new Vector(20, 30),
		velocity: new Vector(0, 0),
		acceleration: 120,
		width: 35,
		heigth: 35,

		side: TANK_SIDE,
		state: {
			spawn: game.elapsedTime,
			invincible: game.elapsedTime,
		},
		canInitCollision: true,
		prevTile: { x: 0, y: 0 },
		lives: 1,
	};
	return entity;
}
