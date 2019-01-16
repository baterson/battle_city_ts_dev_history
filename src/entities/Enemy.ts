import {
	Direction,
	TANK_VELOCITY,
	TANK_LIVES,
	TANK_SIDE,
	move,
	renderMovable,
	goBack,
	setRandomDirection,
	setOpositeDirection,
	getCollisionPoints,
	isOutOfScreen,
	shot,
	destroy,
} from './common';

export default function createEnemy(allTypesSprites) {
	return function enemy(id, x, y, direction, type) {
		return {
			type: 'enemy',
			id,
			direction,
			x,
			y,
			sprites: allTypesSprites[type],
			velocity: TANK_VELOCITY[type],
			side: TANK_SIDE,
			prevTile: { x: 0, y: 0 },
			lives: TANK_LIVES[type],
			canShoot: true,

			render: renderMovable,
			goBack,
			setRandomDirection,
			setOpositeDirection,
			getCollisionPoints,
			isOutOfScreen,
			shot,
			destroy,

			update(deltaTime, game) {
				if (this.isSpawning) {
					this.spawnTimer -= 1;
					return;
				} else if (this.isDeath) {
					this.deathTimer -= 1;
					return;
				}
				this.move(deltaTime);
			},

			move(deltaTime) {
				if (
					Math.abs(Math.floor(this.prevTile.x - this.x)) > 120 ||
					Math.abs(Math.floor(this.prevTile.y - this.y)) > 120
				) {
					this.prevTile = { x: this.x, y: this.y };
					this.shot();
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
					this.shot();
				}
			},

			resolveEntityCollision(other, level, initiator) {
				if (other.type === 'bullet' && other.shooter.type === 'player') {
					if (this.lives === 1) {
						this.destroy();
					} else {
						this.lives -= 1;
						this.sprites = allTypesSprites[`${this.type}${this.lives}`];
					}
				} else if (other.type === 'enemy' && initiator.id === this.id) {
					this.goBack();
					this.setOpositeDirection();
				} else if (other.type === 'player') {
					this.goBack();
					this.shot();
				}
			},
		};
	};
}
