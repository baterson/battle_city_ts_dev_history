import {
	Direction,
	TANK_VELOCITY,
	TANK_LIVES,
	TANK_SIDE,
	move,
	renderAnimated,
	goBack,
	setRandomDirection,
	setOpositeDirection,
	getCollisionPoints,
	isOutOfScreen,
	shot,
} from './common';
import entityManager from '../entityManager';

export default function createEnemy(allTypesSprites, spawnAnimation, deathAnimation) {
	return function enemy(id, x, y, direction, type) {
		return {
			type: 'enemy',
			id,
			direction,
			x,
			y,
			spawnAnimation,
			deathAnimation,
			sprites: allTypesSprites[type],
			velocity: TANK_VELOCITY[type],
			side: TANK_SIDE,
			prevTile: { x: 0, y: 0 },
			lives: TANK_LIVES[type],
			spawnTick: spawnAnimation.length - 1,
			deathTick: 0,

			render: renderAnimated,
			goBack,
			setRandomDirection,
			setOpositeDirection,
			getCollisionPoints,
			isOutOfScreen,
			shot,

			update(deltaTime, game) {
				if (this.spawnTick) {
					this.spawnTick -= 1;
					return;
				} else if (this.deathTick) {
					this.deathTick -= 1;
					return;
				}
				this.move(deltaTime, game.stage.ticks);
			},

			move(deltaTime, ticks) {
				if (
					Math.abs(Math.floor(this.prevTile.x - this.x)) > 120 ||
					Math.abs(Math.floor(this.prevTile.y - this.y)) > 120
				) {
					this.prevTile = { x: this.x, y: this.y };
					this.shot(ticks);
					this.setRandomDirection();
				} else {
					move(deltaTime);
				}
			},

			resolveEdgeCollision() {
				this.goBack();
				this.setRandomDirection();
			},

			resolveTileCollision(tiles, game) {
				this.goBack();
				if (!this.canShoot) {
					this.setOpositeDirection();
				} else {
					this.shot(game.stage.ticks);
				}
			},

			resolveEntityCollision(other, game, initiator) {
				if (other.type === 'bullet' && other.shooter.type === 'player') {
					if (this.lives === 1) {
						this.deathTick = this.deathAnimation.length - 1;
						entityManager.toRemove(this.id);
					} else {
						this.lives -= 1;
						this.sprites = allTypesSprites[`${this.type}${this.lives}`];
					}
				} else if (other.type === 'enemy' && initiator.id === this.id) {
					this.goBack();
					this.setOpositeDirection();
				} else if (other.type === 'player') {
					this.goBack();
					this.shot(game.stage.ticks);
				}
			},
		};
	};
}
