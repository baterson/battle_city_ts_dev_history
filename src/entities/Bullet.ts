import { renderMovable, getCollisionPoints, isOutOfScreen, shot, move, BULLET_VELOCITY, BULLET_SIDE } from './common';
import entityManager from '../entityManager';

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
			move,

			update(deltaTime) {
				this.move(deltaTime);
			},

			resolveEdgeCollision() {
				entityManager.toRemove(this.id);
			},

			resolveTileCollision(tiles, game) {
				entityManager.toRemove(this.id);
				tiles.forEach(tile => {
					game.stage.map.destroy(tile);
				});
			},

			resolveEntityCollision(other, game) {
				if ((other.type === 'enemy' && this.shooter.type === 'enemy') || other.type === 'powerUp') return;
				entityManager.toRemove(this.id);
			},
		};
	};
}
