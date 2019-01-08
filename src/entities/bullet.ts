import Entity, { Direction } from './Entity';
import Enemy from './Enemy';
import Sprite from '../Sprite';
import PowerUp from './PowerUp';

const BULLET_SIDE = 10;
const BULLET_VELOCITY = 350;

class Bullet extends Entity {
	public shooter;
	private shootUnlockCb;

	constructor({
		x,
		y,
		shooter,
		direction,
		shootUnlockCb,
		side = BULLET_SIDE,
		velocity = BULLET_VELOCITY,
		sprites = {
			[Direction.top]: [new Sprite(322.25, 101.5, 5, 5.7)],
			[Direction.bottom]: [new Sprite(338.5, 101.5, 5, 5.7)],
			[Direction.right]: [new Sprite(345.75, 101.5, 5, 5.7)],
			[Direction.left]: [new Sprite(329.5, 101.5, 5, 5.7)],
		},
	}) {
		super({ x, y, side, direction, velocity, sprites, deathTimer: 0, deathSprites: [] });
		this.shooter = shooter;
		this.shootUnlockCb = shootUnlockCb;
	}

	update = deltaTime => {
		if (this.isDeath) return;
		this.move(deltaTime);
	};

	resolveEdgeCollision = () => {
		this.shootUnlockCb();
		this.destroy();
	};

	resolveTileCollision = (tiles, level) => {
		this.destroy();
		this.shootUnlockCb();
		tiles.forEach(tile => {
			level.map.destroy(tile);
		});
	};

	resolveEntityCollision(other, level) {
		if ((other instanceof Enemy && this.shooter instanceof Enemy) || other instanceof PowerUp) return;
		this.destroy();
		this.shootUnlockCb();
	}
}

export { BULLET_SIDE, BULLET_VELOCITY };
export default Bullet;
