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

export enum Power {
	Default,
	First,
	Second,
}

const velocityScale = {
	[Power.Default]: 1,
	[Power.First]: 1.5,
	[Power.Second]: 2,
};

function powerupObserver(game, powerupType) {
	if (powerupType === Powerups.tank) {
		this.lives += 1;
	} else if (powerupType === Powerups.helmet) {
		this.state.invincible = game.elapsedTime;
	} else if (powerupType === Powerups.star && this.power < Power.Second) {
		this.power += 1;
	}
}

export function player(id, game) {
	// TODO: getstate/setstate bind inside constructor
	const entity = {
		type: 'player',
		id,
		direction: Direction.top,
		x: 20,
		y: 50,
		// x: PLAYER_SPAWN_POSITION.x,
		// y: PLAYER_SPAWN_POSITION.y,
		velocity: PLAYER_VELOCITY,
		side: TANK_SIDE,
		state: {
			spawn: game.elapsedTime,
			invincible: game.elapsedTime,
		},
		canInitCollision: true,
		prevTile: { x: 0, y: 0 },
		lives: 1,
		power: Power.Default,

		goBack,
		getCollisionPoints,
		isOutOfScreen,
		shot,
		move,

		update(game) {
			const spawnLeft = getStateRemainingTime('spawn', this, game);
			const deathLeft = getStateRemainingTime('death', this, game);

			// if (deathLeft === 1 && this.lives > 0) {
			// 	return;
			if (deathLeft > 0 || spawnLeft > 0) {
				return;
			}
			this.processInput(game);
		},

		render(game) {
			const spawnLeft = getStateRemainingTime('spawn', this, game);
			const deathLeft = getStateRemainingTime('death', this, game);
			const getAnimIndex = (length, left, spritesLength) => {
				const step = length / spritesLength;
				return Math.floor(left / step);
			};

			if (spawnLeft >= 0) {
				const sprites = game.sprites.tankSpawnAnimation;
				const index = getAnimIndex(1, spawnLeft, sprites.length - 1);
				const frame = sprites[index];
				frame.sprite(this.x, this.y, this.side);
				return;
			} else if (deathLeft >= 0) {
				const index = Math.floor(spawnLeft);
				const frame = game.sprites.tankSpawnAnimation[index];
				frame.sprite(this.x, this.y, this.side);
				return;
			}

			let distance;
			const sprites = game.sprites[`${this.type}${this.power}`][this.direction];
			if (this.direction === Direction.left || this.direction === Direction.right) {
				distance = this.x;
			} else {
				distance = this.y;
			}
			const index = Math.floor(distance / 2) % sprites.length;
			sprites[index](this.x, this.y, this.side);

			if (getStateRemainingTime('invincible', this, game) >= 0 && spawnLeft < 0) {
				const invincibleSprites = game.sprites.invincible;
				const index = Math.floor(game.elapsedTime / 0.1) % sprites.length;
				invincibleSprites[index](this.x, this.y, this.side);
			}
		},

		processInput(game) {
			this.prevY = this.y;
			this.prevX = this.x;
			const key = keyboard.getKey();
			if (key === Keys.ArrowUp) {
				this.direction = Direction.top;
				this.move(velocityScale[this.power], game);
			} else if (key === Keys.ArrowDown) {
				this.direction = Direction.bottom;
				this.move(velocityScale[this.power], game);
			} else if (key === Keys.ArrowLeft) {
				this.direction = Direction.left;
				this.move(velocityScale[this.power], game);
			} else if (key === Keys.ArrowRight) {
				this.direction = Direction.right;
				this.move(velocityScale[this.power], game);
			} else if (key === Keys.Space) {
				this.shot(game);
			}
		},

		resolveEdgeCollision() {
			this.goBack();
		},

		resolveTileCollision() {
			this.goBack();
		},

		resolveEntityCollision(other, game) {
			if (other.type === 'powerup') {
				return;
			} else if (getStateRemainingTime('death', other, game) >= 0) {
				return;
			}

			if (other.type === 'bullet') {
				if (getStateRemainingTime('invincible', this, game) >= 0) return;

				this.state.death = game.elapsedTime;
				this.lives -= 1;
				if (this.lives === 0) {
					entityManager.toRemove(this.id);
				}
			} else {
				this.goBack();
			}
		},

		respawn(game) {
			this.state.spawn = game.elapsedTime;
			this.state.invincible = game.elapsedTime;
			this.power = Power.Default;
			this.x = PLAYER_SPAWN_POSITION.x;
			this.y = PLAYER_SPAWN_POSITION.y;
		},
	};

	powerupEvents.subscribe(entity.id, powerupObserver.bind(entity, game));
	return entity;
}
