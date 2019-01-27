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
	getState,
	setState,
} from './common';
import keyboard, { Keys } from '../keyboard';
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

		canInitCollision: true,
		spawnTick: 0,
		prevTile: { x: 0, y: 0 },
		lives: 3,

		goBack,
		getCollisionPoints,
		isOutOfScreen,
		shot,
		move,

		update(game) {
			const spawnLeft = getState('spawn', this, game);
			const deathLeft = getState('death', this, game);

			// if (deathLeft === 1 && this.lives > 0) {
			// 	return;
			if (deathLeft > 0 || spawnLeft > 0) {
				return;
			}
			this.processInput(game);
		},

		render(game) {
			const spawnLeft = getState('spawn', this, game);
			const deathLeft = getState('death', this, game);
			if (spawnLeft >= 0) {
				const index = Math.floor(spawnLeft);
				console.log('IN', index);
				const frame = game.sprites.tankDeathAnimation[index];
				console.log('Fra', frame);
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
				// this.shot(ticks);
			}
		},

		resolveEdgeCollision() {
			this.goBack();
		},

		resolveTileCollision() {
			this.goBack();
		},

		resolveEntityCollision(other, game) {
			const isOtherDead = getState('death', other, game);
			if (isOtherDead) return;
			if (other.type === 'bullet') {
				setState('death', this, game);
				this.lives -= 1;
				if (this.lives === 0) {
					entityManager.toRemove(this.id);
				}
			} else {
				this.goBack();
			}
		},

		respawn(game) {
			setState('spawn', this, game);
			this.x = PLAYER_SPAWN_POSITION.x;
			this.y = PLAYER_SPAWN_POSITION.y;
		},
	};

	setState('spawn', entity, game);
	return entity;
}
