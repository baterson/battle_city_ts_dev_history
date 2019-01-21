import { START_TICKS } from '../Stage';

const canvas: any = document.getElementById('root');
const context = canvas.getContext('2d');

export default {
	canvas,
	context,
	clearScreen() {
		context.clearRect(0, 0, 600, 600);
		context.beginPath();
	},
	renderStageStarting(ticks) {
		context.fillRect(0, 0, 600, START_TICKS - ticks);
		context.fillRect(0, START_TICKS + ticks, 600, START_TICKS - ticks);
	},
};
