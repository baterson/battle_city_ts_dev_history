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

export function player(id, game) {
	const entity = {
		type: 'player',
		id,
		direction: Direction.top,
		x: PLAYER_SPAWN_POSITION.x,
		y: PLAYER_SPAWN_POSITION.y,
		velocity: PLAYER_VELOCITY,
		side: TANK_SIDE,
		state: {
			spawn: game.elapsedTime,
		},
		canInitCollision: true,
		prevTile: { x: 0, y: 0 },
		lives: 2,

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

			if (spawnLeft >= 0) {
				const index = Math.floor(spawnLeft);
				const frame = game.sprites.tankDeathAnimation[index];
				frame.sprite(this.x, this.y, this.side);
				return;
			} else if (deathLeft >= 0) {
				const index = Math.floor(spawnLeft);
				const frame = game.sprites.tankSpawnAnimation[index];
				frame.sprite(this.x, this.y, this.side);
				return;
			}

			let distance;
			const sprites = game.sprites[this.type][this.direction];
			if (this.direction === Direction.left || this.direction === Direction.right) {
				distance = this.x;
			} else {
				distance = this.y;
			}
			const index = Math.floor(distance / 2) % sprites.length;
			sprites[index](this.x, this.y, this.side);
		},

		processInput(game) {
			this.prevY = this.y;
			this.prevX = this.x;
			const key = keyboard.getKey();

			if (key === Keys.ArrowUp) {
				this.direction = Direction.top;
				this.move(game);
			} else if (key === Keys.ArrowDown) {
				this.direction = Direction.bottom;
				this.move(game);
			} else if (key === Keys.ArrowLeft) {
				this.direction = Direction.left;
				this.move(game);
			} else if (key === Keys.ArrowRight) {
				this.direction = Direction.right;
				this.move(game);
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
			this.x = PLAYER_SPAWN_POSITION.x;
			this.y = PLAYER_SPAWN_POSITION.y;
		},

		powerupObserver(powerupType) {
			console.log('This', this);
			if (powerupType === Powerups.tank) {
				console.log('this.lives', this.lives);
				this.lives += 1;
			}
		},
	};
	// TODO: move observer to module
	powerupEvents.subscribe(entity.id, entity.powerupObserver.bind(entity));
	return entity;
}
