import { Directon } from '../Entity';
import Enemy from '../Enemy';
import Sprite from '../Sprite';
import canvas from '../canvas';

const enemy = (x, y, direction) => {
	const sprites = {
		[Directon.top]: [new Sprite(0, 128, 16, 15), new Sprite(16, 128, 16, 15)],
		[Directon.bottom]: [new Sprite(64, 128, 16, 15), new Sprite(80, 128, 16, 15)],
		[Directon.right]: [new Sprite(96, 128, 16, 15), new Sprite(112, 128, 16, 15)],
		[Directon.left]: [new Sprite(32, 128, 16, 15), new Sprite(48, 128, 16, 15)],
	};

	const enemy = new Enemy(x, y, 40, 40, direction, 100, sprites);
	enemy.render = () => {
		enemy._render();
		const { context } = canvas;
		if (enemy.direction === Directon.top) {
			context.fillRect(enemy.x, enemy.y - 3, enemy.width, 3);
			context.fillStyle = 'blue';
			context.stroke();
		}
		if (enemy.direction === Directon.right) {
			context.fillRect(enemy.x + enemy.height, enemy.y, 3, enemy.width);
			context.fillStyle = 'blue';
			context.stroke();
		}
		if (enemy.direction === Directon.bottom) {
			context.fillRect(enemy.x, enemy.y + 43, enemy.width, 3);
			context.fillStyle = 'blue';
			context.stroke();
		}
		if (enemy.direction === Directon.left) {
			context.fillRect(enemy.x - 3, enemy.y, 3, enemy.height);
			context.fillStyle = 'blue';
			context.stroke();
		}
	};

	return enemy;
};

export default enemy;
