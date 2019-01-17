import {
	Direction,
	renderAnimated,
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

export default function createPlayer(sprites, spawnAnimation, deathAnimation) {
	return function player(id) {
		return {
			type: 'player',
			id,
			direction: Direction.top,
			x: PLAYER_SPAWN_POSITION.x,
			y: PLAYER_SPAWN_POSITION.y,
			spawnAnimation,
			deathAnimation,
			sprites,
			velocity: PLAYER_VELOCITY,
			side: TANK_SIDE,
			prevTile: { x: 0, y: 0 },
			lives: 3,
			spawnTick: spawnAnimation.length - 1,
			deathTick: 0,

			goBack,
			getCollisionPoints,
			isOutOfScreen,
			shot,
			move,
			render: renderAnimated,

			update(deltaTime, game) {
				if (this.spawnTick) {
					this.spawnTick -= 1;
					return;
				} else if (this.deathTick) {
					if (this.deathTick === 1) {
						this.respawn();
					}
					this.deathTick -= 1;
					return;
				}
				this.processInput(deltaTime);
			},

			processInput(deltaTime) {
				this.prevY = this.y;
				this.prevX = this.x;
				// const { keyStates } = keyboard;
				const key = keyboard.getKey();

				if (key === Keys.ArrowUp) {
					this.direction = Direction.top;
					this.move(deltaTime);
				} else if (key === Keys.ArrowDown) {
					this.direction = Direction.bottom;
					this.move(deltaTime);
				} else if (key === Keys.ArrowLeft) {
					this.direction = Direction.left;
					this.move(deltaTime);
				} else if (key === Keys.ArrowRight) {
					this.direction = Direction.right;
					this.move(deltaTime);
				} else if (key === Keys.Space) {
					this.shot();
				}
				// } else if (keyStates.Space) {
				// 	this.shot();
				// }
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
						// TODO: gameover
					}

					this.deathTick = this.deathAnimation - 1;
					this.lives -= 1;
				} else {
					this.goBack();
				}
			},

			respawn() {
				this.spawnTimer = this.spawnAnimation.length - 1;
				this.x = PLAYER_SPAWN_POSITION.x;
				this.y = PLAYER_SPAWN_POSITION.y;
			},
		};
	};
}
