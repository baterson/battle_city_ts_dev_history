import { Directon } from '../entities/Entity';
import Enemy from '../entities/Enemy';
import Sprite from '../Sprite';

const enemy = (x, y, direction) => {
	const sprites = {
		[Directon.top]: [new Sprite(0, 128, 16, 15), new Sprite(16, 128, 16, 15)],
		[Directon.bottom]: [new Sprite(64, 128, 16, 15), new Sprite(80, 128, 16, 15)],
		[Directon.right]: [new Sprite(96, 128, 16, 15), new Sprite(112, 128, 16, 15)],
		[Directon.left]: [new Sprite(32, 128, 16, 15), new Sprite(48, 128, 16, 15)],
	};

	return new Enemy(x, y, 35, direction, 100, sprites);
};

export default enemy;
