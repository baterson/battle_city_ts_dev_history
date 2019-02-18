import { getAnimIndex } from '../entities/common';

const canvas: any = document.getElementById('root');
const context = canvas.getContext('2d');

export default {
	canvas,
	context,
	clearScreen() {
		context.clearRect(0, 0, 600, 600);
		context.beginPath();
	},

	renderChaingingStage(left) {
		// TODO: change 300 to const
		const index = getAnimIndex(200, left, 300);
		context.fillRect(0, 0, 600, index);
		context.fillRect(0, 600 - index, 600, index);
	},

	renderGameOver(left = 0, textSprites) {
		const index = getAnimIndex(200, left, 300);
		context.fillRect(0, 0, 600, 300 - index);
		context.fillRect(0, 300 + index, 600, 300 - index);
		if (!left) {
			textSprites({ x: 200, y: 200 }, { x: 200, y: 150 });
		}
	},
};
