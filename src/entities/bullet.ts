import Entity, { Direction } from './Entity';
import Sprite from '../Sprite';

const BULLET_SIDE = 10;
const BULLET_VELOCITY = 300;

class Bullet extends Entity {
	constructor({
		x,
		y,
		side = BULLET_SIDE,
		velocity = BULLET_VELOCITY,
		direction,
		sprites = {
			[Direction.top]: [new Sprite(322.25, 101.5, 5, 5.7)],
			[Direction.bottom]: [new Sprite(338.5, 101.5, 5, 5.7)],
			[Direction.right]: [new Sprite(345.75, 101.5, 5, 5.7)],
			[Direction.left]: [new Sprite(329.5, 101.5, 5, 5.7)],
		},
	}) {
		super({ x, y, side, direction, velocity, sprites });
	}

	update = deltaTime => {
		this.move(deltaTime);
	};

	resolveEdgeCollision = () => {
		this.destroy();
	};

	resolveTileCollision = (tiles, level) => {
		this.destroy();
		tiles.forEach(tile => {
			level.map.destroy(tile);
		});
	};

	resolveEntityCollision(other, level) {
		this.destroy();
	}
}

export { BULLET_SIDE, BULLET_VELOCITY };
export default Bullet;
