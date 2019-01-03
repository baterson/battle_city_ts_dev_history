import { Directon } from '../entities/Entity';
import Player from '../entities/Player';
import Sprite from '../Sprite';

const player = () => {
	const sprites = {
		[Directon.top]: [new Sprite(0, 0, 16, 15), new Sprite(16, 0, 16, 15)],
		[Directon.bottom]: [new Sprite(64, 0, 16, 15), new Sprite(80, 0, 16, 15)],
		[Directon.right]: [new Sprite(96, 0, 16, 15), new Sprite(112, 0, 16, 15)],
		[Directon.left]: [new Sprite(32, 0, 16, 15), new Sprite(48, 0, 16, 15)],
	};

	const player = new Player(0, 0, 35, Directon.top, 200, sprites);
	// player.render = () => {
	// 	player._render();
	// 	const { context } = canvas;
	// 	if (player.direction === Directon.top) {
	// 		context.fillRect(player.x, player.y - 3, player.width, 3);
	// 		context.fillStyle = 'blue';
	// 		context.stroke();
	// 	}
	// 	if (player.direction === Directon.right) {
	// 		context.fillRect(player.x + player.height, player.y, 3, player.width);
	// 		context.fillStyle = 'blue';
	// 		context.stroke();
	// 	}
	// 	if (player.direction === Directon.) {
	// 		context.fillRect(player.x, playerbottom.y + 43, player.width, 3);
	// 		context.fillStyle = 'blue';
	// 		context.stroke();
	// 	}
	// 	if (player.direction === Directon.left) {
	// 		context.fillRect(player.x - 3, player.y, 3, player.height);
	// 		context.fillStyle = 'blue';
	// 		context.stroke();
	// 	}
	// };

	return player;
};

export default player;
