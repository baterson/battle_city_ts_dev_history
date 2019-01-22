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
import entityManager from '../entityManager';

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
					if (this.deathTick === 1 && this.lives > 0) {
						this.respawn();
					}
					this.deathTick -= 1;
					return;
				}
				this.processInput(deltaTime, game.ticks);
			},

			processInput(deltaTime, ticks) {
				this.prevY = this.y;
				this.prevX = this.x;
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
					this.shot(ticks);
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
					this.deathTick = this.deathAnimation.length - 1;
					this.lives -= 1;
					if (this.lives === 0) {
						entityManager.toRemove(this.id);
					}
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
