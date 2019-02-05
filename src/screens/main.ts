import { START_TICKS } from '../Stage';

const canvas: any = document.getElementById('root');
const context = canvas.getContext('2d');
const getAnimIndex = (animLength, left, spritesLength) => {
	const step = animLength / spritesLength;
	return Math.floor(left / step);
};

export default {
	canvas,
	context,
	clearScreen() {
		context.clearRect(0, 0, 600, 600);
		context.beginPath();
	},
	renderStageStarting(left) {
		const index = getAnimIndex(0.5, left, 300);

		context.fillRect(0, 0, 600, index);
		context.fillRect(0, 600 - index, 600, index);
		// context.fillRect(0, 0, 600, 300 - index); // GAMEOVER ANIM
		// context.fillRect(0, 300 + index, 600, 300 - index);

		// context.fillRect(0, 0, 600, 300 - ticks);
		// context.fillRect(0, START_TICKS + ticks, 600, START_TICKS - ticks);
	},

	renderGameOver(left) {
		const index = getAnimIndex(0.5, left, 300);
		context.fillRect(0, 0, 600, 300 - index); // GAMEOVER ANIM
		context.fillRect(0, 300 + index, 600, 300 - index);
	},
};
