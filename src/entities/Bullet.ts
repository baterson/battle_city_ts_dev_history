import { Entity } from './Entity';
import { Vector } from '../utils/vector';
import { Direction, animateMovement, move, isOutOfScreen } from './common';
import entityManager from '../entityManager';

const BULLET_VELOCITY = 200;

class Bullet extends Entity {
	public prevPosition: Vector;
	public direction: Direction;
	public shooter: any;

	constructor(position: Vector, direction: Direction, shooter: any) {
		// TODO: types to shooter
		super(position, new Vector(10, 10));
		this.prevPosition = new Vector(position.x, position.y);
		this.direction = direction;
		this.shooter = shooter;
	}

	update(game) {
		this.move(game.deltaTime, BULLET_VELOCITY);
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
	}

	resolveEntityCollision(other, game) {
		// if(other instanceof PowerUp) return
		entityManager.toRemove(this.id);
	}
}

interface Bullet {
	animateMovement(sprites): void;
	move(deltaTime: number, scale?: number): void;
	isOutOfScreen(): void;
}

Bullet.prototype.move = move;
Bullet.prototype.animateMovement = animateMovement;
Bullet.prototype.isOutOfScreen = isOutOfScreen;

export { Bullet };
