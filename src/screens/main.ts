import timer from '../timer';
import { START_TICKS } from '../constants';

const canvas: any = document.getElementById('root');
const context = canvas.getContext('2d');

export default {
	canvas,
	context,
	clearScreen() {
		context.clearRect(0, 0, 600, 600);
		context.beginPath();
	},
	//drawStarting
	drawStageStart() {
		context.fillRect(0, 0, 600, START_TICKS - timer.ticks);
		context.fillRect(0, START_TICKS + timer.ticks, 600, START_TICKS - timer.ticks);
	},
};
