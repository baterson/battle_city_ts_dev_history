import {
	Direction,
	renderMovable,
	goBack,
	getCollisionPoints,
	isOutOfScreen,
	shot,
	move,
	PLAYER_SPAWN_POSITION,
	PLAYER_VELOCITY,
	TANK_SIDE,
} from './common';
import keyboard, { Keys } from '../keyboard';

export default function createPlayer(sprites) {
	return function player(id) {
		return {
			type: 'player',
			id,
			direction: Direction.top,
			x: PLAYER_SPAWN_POSITION.x,
			y: PLAYER_SPAWN_POSITION.y,
			sprites,
			velocity: PLAYER_VELOCITY,
			side: TANK_SIDE,
			prevTile: { x: 0, y: 0 },
			lives: 3,
			canShoot: true,

			render: renderMovable,
			goBack,
			getCollisionPoints,
			isOutOfScreen,
			shot,
			move,

			update(deltaTime, game) {
				if (this.isSpawning) {
					this.spawnTimer -= 1;
					return;
				} else if (this.isDeath) {
					this.deathTimer -= 1;
					return;
				}
				this.processInput(deltaTime);
			},

			processInput(deltaTime) {
				this.prevY = this.y;
				this.prevX = this.x;
				const { keyStates } = keyboard;
				const movement = keyboard.getMovement();

				if (movement === Keys.ArrowUp) {
					this.direction = Direction.top;
					this.move(deltaTime);
				} else if (movement === Keys.ArrowDown) {
					this.direction = Direction.bottom;
					this.move(deltaTime);
				} else if (movement === Keys.ArrowLeft) {
					this.direction = Direction.left;
					this.move(deltaTime);
				} else if (movement === Keys.ArrowRight) {
					this.direction = Direction.right;
					this.move(deltaTime);
					// TODO: move space in common queue
				} else if (keyStates.Space) {
					this.shot();
				}
			},

			resolveEdgeCollision() {
				this.goBack();
			},

			resolveTileCollision() {
				this.goBack();
			},

			resolveEntityCollision(other, game) {
				if (other.isDeath) return;

				if (other.type === 'bullet') {
					if (this.lives === 0) {
					}

					this.isDeath = true;
					this.lives -= 1;
					// timer.set(TANK_DEATH_TIMER, () => this.respawn());
				} else {
					this.goBack();
				}
			},

			respawn() {
				this.isSpawning = true;
				this.isDeath = false;
				// this.deathTimer = TANK_DEATH_TIMER;
				// this.spawnTimer = TANK_SPAWN_TIMER;
				// this.x = PLAYER_SPAWN_POSITION.x;
				// this.y = PLAYER_SPAWN_POSITION.y;
				// timer.set(TANK_SPAWN_TIMER, () => {
				//     this.isSpawning = false;
				//     this.spawnTimer = TANK_SPAWN_TIMER;
				// });
			},
		};
	};
}
