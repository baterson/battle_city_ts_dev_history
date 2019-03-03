import { getAnimationIndex } from '../utils';
import { assetsHolder } from '../utils';

const canvas = <HTMLCanvasElement>document.getElementById('root');
const context = canvas.getContext('2d');
export const getAnimIndex = (animationLength: number, framesLeft: number, spritesLength: number) => {
	const step = animationLength / spritesLength;
	return Math.floor(framesLeft / step);
};

export const main = {
	canvas,
	context,
	clearScreen() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.beginPath();
	},

	renderChaingingStage(left: number) {
		// TODO: change 300 to const
		const index = getAnimationIndex(200, left, 300);
		context.fillRect(0, 0, 600, index);
		context.fillRect(0, 600 - index, 600, index);
	},

	renderGameOver(left = 0) {
		const index = getAnimationIndex(200, left, 300);
		context.fillRect(0, 0, 600, 300 - index);
		context.fillRect(0, 300 + index, 600, 300 - index);
		if (!left) {
			assetsHolder.sprites.gameOver({ x: 200, y: 200 }, { x: 200, y: 150 });
		}
	},
};
