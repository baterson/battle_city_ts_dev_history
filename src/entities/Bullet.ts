import { Movable } from './Movable';
import { Direction, Tile, Vector } from '../types';
import { BULLET_VELOCITY, BULLET_SIZE } from '../constants';
import { Powerup } from './Powerup';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { SoundManager, entityManager } from '../managers/';
import { TileMap } from '../TileMap';
import { assetsHolder } from '../utils';

export class Bullet extends Movable {
	public prevPosition: Vector;
	public direction: Direction;
	public shooter: Player | Enemy;
	public soundManager: SoundManager<'hit'>;

	constructor(position: Vector, direction: Direction, shooter: Player | Enemy) {
		super(position, { ...BULLET_SIZE }, direction);
		this.direction = direction;
		this.shooter = shooter;
		this.soundManager = new SoundManager(['hit']);
	}

	update() {
		this.move(BULLET_VELOCITY);
	}

	render() {
		this.animateMovement(assetsHolder.sprites.bullet[this.direction]);
	}

	resolveEdgeCollision() {
		entityManager.toRemove(this.id);
	}

	resolveTileCollision(tiles: Tile[], tileMap: TileMap) {
		entityManager.toRemove(this.id);
		tiles.forEach(tile => {
			tileMap.destroy(tile.position);
		});
		this.soundManager.play('hit');
	}

	resolveEntityCollision(other) {
		if (other instanceof Powerup) return;
		entityManager.toRemove(this.id);
	}
}
