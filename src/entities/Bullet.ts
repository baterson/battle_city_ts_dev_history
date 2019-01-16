import {
	renderMovable,
	getCollisionPoints,
	isOutOfScreen,
	shot,
	destroy,
	move,
	BULLET_VELOCITY,
	BULLET_SIDE,
} from './common';

export default function createBullet(sprites) {
	return function bullet(id, x, y, direction, shooter) {
		return {
			type: 'bullet',
			id,
			shooter,
			direction,
			x,
			y,
			sprites,
			velocity: BULLET_VELOCITY,
			side: BULLET_SIDE,

			render: renderMovable,
			getCollisionPoints,
			isOutOfScreen,
			shot,
			destroy,
			move,

			update(deltaTime) {
				if (this.isDeath) return;
				this.move(deltaTime);
			},

			resolveEdgeCollision() {
				this.destroy();
			},

			resolveTileCollision(tiles, game) {
				this.destroy();
				tiles.forEach(tile => {
					game.stage.map.destroy(tile);
				});
			},

			resolveEntityCollision(other, game) {
				if ((other.type === 'enemy' && this.shooter.type === 'enemy') || other.type === 'powerUp') return;
				this.destroy();
			},
		};
	};
}
