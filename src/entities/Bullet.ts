import { Entity } from './Entity';
import { Vector } from '../utils';
import { animateMovement, move, isOutOfScreen, getFrontCollisionPoints } from './commonMethods';
import { Direction, Bullet as IBullet } from '../types';
import { BULLET_VELOCITY, BULLET_SIZE } from '../constants';
import { Powerup } from './Powerup';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { audioManager } from '../utils/audioManager';
import entityManager from '../entityManager';

interface Bullet extends IBullet {}

class Bullet extends Entity {
	public prevPosition: Vector;
	public direction: Direction;
	public shooter: any;

	constructor(position: Vector, direction: Direction, shooter: Player | Enemy) {
		super(position, new Vector(...BULLET_SIZE));
		this.prevPosition = new Vector(position.x, position.y);
		this.direction = direction;
		this.shooter = shooter;
	}

	update(game) {
		this.move(BULLET_VELOCITY);
	}

	render(game) {
		this.animateMovement(game.sprites.bullet[this.direction]);
	}

	resolveEdgeCollision() {
		entityManager.toRemove(this.id);
	}

	resolveTileCollision(tiles, game) {
		entityManager.toRemove(this.id);
		tiles.forEach(tile => {
			game.stage.map.destroy(tile.x, tile.y);
		});
		audioManager.play('hit');
		// audioManager.play('hit')
		// audioManager.play('hit')
	}

	resolveEntityCollision(other, game) {
		if (other instanceof Powerup) return;
		entityManager.toRemove(this.id);
	}
}

Bullet.prototype.move = move;
Bullet.prototype.animateMovement = animateMovement;
Bullet.prototype.isOutOfScreen = isOutOfScreen;
Bullet.prototype.getFrontCollisionPoints = getFrontCollisionPoints;

export { Bullet };
