import { Directon } from '../Entity';
import Bullet from '../Bullet';
import Sprite from '../Sprite';
import canvas from '../canvas';

const BULLET_SIZE = {
	width: 15,
	heigth: 20,
};

const bullet = (x, y, direction) => {
	const sprites = {
		[Directon.top]: [new Sprite(320, 96, 8, 10)],
		[Directon.bottom]: [new Sprite(336, 96, 8, 10)],
		[Directon.right]: [new Sprite(344, 96, 8, 10)],
		[Directon.left]: [new Sprite(328, 96, 8, 10)],
	};

	return new Bullet(x, y, 15, 20, direction, 200, sprites);
};

export { BULLET_SIZE };
export default bullet;
