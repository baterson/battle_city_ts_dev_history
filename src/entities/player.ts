import { Directon } from '../Entity';
import Player from '../Player';
import Sprite from '../Sprite';
import canvas from '../canvas';

const player = () => {
	const sprites = {
		[Directon.top]: [new Sprite(0, 0, 16, 15), new Sprite(16, 0, 16, 15)],
		[Directon.bottom]: [new Sprite(64, 0, 16, 15), new Sprite(80, 0, 16, 15)],
		[Directon.right]: [new Sprite(96, 0, 16, 15), new Sprite(112, 0, 16, 15)],
		[Directon.left]: [new Sprite(32, 0, 16, 15), new Sprite(48, 0, 16, 15)],
	};

	const player = new Player(120, 80, 40, 40, Directon.top, 200, sprites);
	player.render = () => {
		player._render();
		const { context } = canvas;
		if (player.direction === Directon.top) {
			context.fillRect(player.x, player.y - 3, player.width, 3);
			context.fillStyle = 'blue';
			context.stroke();
		}
		if (player.direction === Directon.right) {
			context.fillRect(player.x + player.height, player.y, 3, player.width);
			context.fillStyle = 'blue';
			context.stroke();
		}
		if (player.direction === Directon.bottom) {
			context.fillRect(player.x, player.y + 43, player.width, 3);
			context.fillStyle = 'blue';
			context.stroke();
		}
		if (player.direction === Directon.left) {
			context.fillRect(player.x - 3, player.y, 3, player.height);
			context.fillStyle = 'blue';
			context.stroke();
		}
	};

	return player;
};

export default player;
