import {
	renderMovable,
	getCollisionPoints,
	isOutOfScreen,
	move,
	BULLET_VELOCITY,
	BULLET_SIDE,
	Direction,
} from './common';
import entityManager from '../entityManager';

export function bullet(id, x, y, direction, shooter) {
	return {
		type: 'bullet',
		id,
		direction,
		x,
		y,
		velocity: BULLET_VELOCITY,
		side: BULLET_SIDE,
		shooter,

		getCollisionPoints,
		isOutOfScreen,
		move,

		update(game) {
			this.move(game);
		},

		render(game) {
			let distance;
			const sprites = game.sprites[this.type];
			if (this.direction === Direction.left || this.direction === Direction.right) {
				distance = this.x;
			} else {
				distance = this.y;
			}
			const index = Math.floor(distance / 2) % sprites.length;
			sprites[index](this.x, this.y, this.side);
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
}
