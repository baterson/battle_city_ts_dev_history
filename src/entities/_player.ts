import { Entity } from './Entity';
import { Vector } from '../utils/vector';
import { TimerManager } from '../utils/TimerManager';
import { Direction, getAnimIndex, animateMovement, move } from './common';
import keyboard, { Keys } from '../keyboard';
import { powerupEvents } from './powerup';
import entityManager from '../entityManager';

const PLAYER_SPAWN_POSITION = [20, 50];

export enum Power {
	Default,
	First,
	Second,
}

class Player extends Entity {
	public prevPosition: Vector;
	public direction: Direction;
	public lives: number;
	public power: Power;
	public timers: TimerManager;

	constructor() {
		super(new Vector(20, 50), new Vector(35, 35));
		this.prevPosition = new Vector(35, 35);
		this.direction = Direction.top;
		this.lives = 1;
		this.power = Power.Default;
		this.timers = new TimerManager();
	}

	update() {
		const spawn = this.timers.getTimer('spawn');
		const death = this.timers.getTimer('death');
		if (spawn || death) return;
	}

	render(game) {
		const spawn = this.timers.getTimer('spawn');
		const death = this.timers.getTimer('death');
		const invincible = this.timers.getTimer('invincible');

		if (spawn) {
			// TODO: Refactor animIndex
			const sprites = game.sprites.tankSpawnAnimation;
			const index = getAnimIndex(1, spawn, sprites.length - 1);
			sprites[index](this.position, this.size);
			return;
		} else if (death) {
			const sprites = game.sprites.tankDeathAnimation;
			const index = getAnimIndex(1, death, sprites.length - 1);
			sprites[index](this.position, this.size);
			return;
		}

		if (invincible) {
			const invincibleSprites = game.sprites.invincible;
			const index = Math.floor(game.elapsedTime / 0.1) % invincibleSprites.length;
			invincibleSprites[index](this.position, this.size);
		}

		this.animateMovement(game.sprites[`player${this.power}`][this.direction]);
	}

	processInput(game) {
		const key = keyboard.getKey();
		let isMoving = true;

		if (key === Keys.ArrowUp) {
			this.direction = Direction.top;
		} else if (key === Keys.ArrowDown) {
			this.direction = Direction.bottom;
		} else if (key === Keys.ArrowLeft) {
			this.direction = Direction.left;
		} else if (key === Keys.ArrowRight) {
			this.direction = Direction.right;
		} else {
			isMoving = false;
		}

		if (key === Keys.Space) {
			// this.shot(game);
		}

		if (isMoving) {
			this.move(game.deltaTime);
		}
	}

	resolveEdgeCollision() {
		this.position = this.prevPosition;
	}

	resolveTileCollision() {
		this.position = this.prevPosition;
	}

	resolveEntityCollision(other, game) {
		// TODO: check for spawn
		// const spawn = this.timers.getTimer('spawn');
		const death = this.timers.getTimer('death');

		if (other.type === 'powerup') {
			// TODO: typeof
			return;
		} else if (death) {
			return;
		}

		if (other.type === 'bullet') {
			const invincible = this.timers.getTimer('invincible');

			if (invincible) return;

			this.timers.setTimer('death');
			this.lives -= 1;
			if (this.lives === 0) {
				entityManager.toRemove(this.id);
			}
		} else {
			this.position = this.prevPosition;
		}
	}

	respawn(game) {
		this.timers.setTimer('spawn');
		this.timers.setTimer('invincible');
		this.power = Power.Default;
		const [x, y] = PLAYER_SPAWN_POSITION;
		this.position = new Vector(x, y);
	}
}

interface Player {
	// TODO: Types
	animateMovement(sprites): void;
	move(deltaTime): void;
}

Player.prototype.animateMovement = animateMovement;
Player.prototype.move = move;
