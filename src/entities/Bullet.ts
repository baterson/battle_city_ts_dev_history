import { BULLET_SPRITES, BULLET_SIDE, BULLET_VELOCITY } from '../constants';
import Entity from './Movable';
import Enemy from './Enemy';
import PowerUp from './PowerUp';

class Bullet extends Entity {
	public shooter;

	constructor(x, y, direction, shooter) {
		super(x, y, BULLET_SIDE, direction, BULLET_VELOCITY, BULLET_SPRITES);
		this.shooter = shooter;
	}

	update = deltaTime => {
		if (this.isDeath) return;
		this.move(deltaTime);
	};

	resolveEdgeCollision() {
		this.destroy();
	}

	resolveTileCollision(tiles, level) {
		this.destroy();
		tiles.forEach(tile => {
			level.map.destroy(tile);
		});
	}

	resolveEntityCollision(other, level) {
		if ((other instanceof Enemy && this.shooter instanceof Enemy) || other instanceof PowerUp) return;
		this.destroy();
	}
}

export default Bullet;
