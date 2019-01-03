import { Directon } from '../entities/Entity';
import Bullet from '../entities/Bullet';
import Sprite from '../Sprite';

const BULLET_SIDE = 10;

const bullet = (x, y, direction) => {
	const sprites = {
		[Directon.top]: [new Sprite(322.25, 101.5, 5, 5.7)],
		[Directon.bottom]: [new Sprite(338.5, 101.5, 5, 5.7)],
		[Directon.right]: [new Sprite(345.75, 101.5, 5, 5.7)],
		[Directon.left]: [new Sprite(329.5, 101.5, 5, 5.7)],
	};
	return new Bullet(x, y, BULLET_SIDE, direction, 200, sprites);
};

export { BULLET_SIDE };
export default bullet;
