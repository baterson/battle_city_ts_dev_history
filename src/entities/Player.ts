import { Entity } from './Entity';
import { Vector } from '../utils/vector';
import { TimeManager } from '../utils/TimeManager';
import {
	Direction,
	getAnimIndex,
	animateMovement,
	move,
	shot,
	goBack,
	isOutOfScreen,
	getFrontCollisionPoints,
	TANK_DEATH_ANIMATION,
	TANK_SPAWN_ANIMATION,
} from './common';
import keyboard, { Keys } from '../keyboard';
import { powerupEvents } from './powerup';
import entityManager from '../entityManager';

const PLAYER_SPAWN_POSITION = [20, 50];

export enum Power {
	Default,
	First,
	Second,
}

const statsByPower = {
	[Power.Default]: {
		velocity: 100,
		shotCD: 50,
	},
	[Power.First]: {
		velocity: 120,
		shotCD: 40,
	},
	[Power.Second]: {
		velocity: 150,
		shotCD: 30,
	},
};

class Player extends Entity {
	public prevPosition: Vector;
	public direction: Direction;
	public lives: number;
	public power: Power;

	constructor() {
		super(new Vector(20, 550), new Vector(35, 35));
		this.prevPosition = new Vector(35, 35);
		this.direction = Direction.Top;
		this.lives = 1;
		this.power = Power.Default;
		this.timeManager.setTimer('spawn', TANK_SPAWN_ANIMATION);
		this.timeManager.setTimer('invincible');
	}

	update(game) {
		this.timeManager.decrementTimers();
		const spawn = this.timeManager.getTimer('spawn');
		const death = this.timeManager.getTimer('death');
		if (spawn || death) return;
		this.processInput(game);
	}

	render(game) {
		const spawn = this.timeManager.getTimer('spawn');
		const death = this.timeManager.getTimer('death');
		const invincible = this.timeManager.getTimer('invincible');
		if (spawn) {
			// TODO: Refactor animIndex
			const sprites = game.sprites.tankSpawnAnimation;
			const index = getAnimIndex(TANK_SPAWN_ANIMATION, spawn, sprites.length - 1);
			sprites[index](this.position, this.size);
			return;
		} else if (death) {
			const sprites = game.sprites.tankDeathAnimation;
			const index = getAnimIndex(TANK_DEATH_ANIMATION, death, sprites.length - 1);
			sprites[index](this.position, this.size);
			return;
		}

		if (invincible) {
			const invincibleSprites = game.sprites.invincible;
			const index = 0.1 % invincibleSprites.length;
			invincibleSprites[index](this.position, this.size);
		}

		this.animateMovement(game.sprites[`player${this.power}`][this.direction]);
	}

	processInput(game) {
		const key = keyboard.getKey();
		let isMoving = true;

		if (key === Keys.ArrowUp) {
			this.direction = Direction.Top;
		} else if (key === Keys.ArrowDown) {
			this.direction = Direction.Bottom;
		} else if (key === Keys.ArrowLeft) {
			this.direction = Direction.Left;
		} else if (key === Keys.ArrowRight) {
			this.direction = Direction.Right;
		} else {
			isMoving = false;
		}

		if (key === Keys.Space) {
			this.shot(statsByPower[this.power].shotCD);
		}

		if (isMoving) {
			this.move(game.deltaTime, statsByPower[this.power].velocity);
		}
	}

	resolveEdgeCollision() {
		this.goBack();
	}

	resolveTileCollision() {
		this.goBack();
	}

	resolveEntityCollision(other, game) {
		// TODO: check for spawn
		// const spawn = this.timeManager.getTimer('spawn');
		const death = this.timeManager.getTimer('death');

		if (other.type === 'powerup') {
			// TODO: typeof
			return;
		} else if (death) {
			return;
		}

		if (other.type === 'bullet') {
			const invincible = this.timeManager.getTimer('invincible');

			if (invincible) return;

			this.timeManager.setTimer('death', TANK_DEATH_ANIMATION);
			this.lives -= 1;
			if (this.lives === 0) {
				entityManager.toRemove(this.id);
			}
		} else {
			this.goBack();
		}
	}

	respawn() {
		this.timeManager.setTimer('spawn', TANK_SPAWN_ANIMATION);
		this.timeManager.setTimer('invincible');
		this.power = Power.Default;
		const [x, y] = PLAYER_SPAWN_POSITION;
		this.position = new Vector(x, y);
	}
}

interface Player {
	// TODO: Types
	animateMovement(sprites): void;
	move(deltaTime: number, velocity: number): void;
	goBack(): void;
	shot(cd?: number): void;
	isOutOfScreen(): void;
	getFrontCollisionPoints(): void;
}

Player.prototype.animateMovement = animateMovement;
Player.prototype.move = move;
Player.prototype.goBack = goBack;
Player.prototype.shot = shot;
Player.prototype.isOutOfScreen = isOutOfScreen;
Player.prototype.getFrontCollisionPoints = getFrontCollisionPoints;

export { Player };
