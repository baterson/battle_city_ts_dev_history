import Sprite from '../Sprite';

const canvas: any = document.getElementById('dashboard');
const context = canvas.getContext('2d');

const tank = new Sprite(320.25, 192.75, 8.5, 7.75, context);
const flag = new Sprite(375.5, 184, 17, 15, context);
const playerTank = new Sprite(376.5, 144.5, 8, 8.5, context);
const numbers = [
	new Sprite(328, 184, 8, 7, context),
	new Sprite(336, 184, 8, 7, context),
	new Sprite(344, 184, 8, 7, context),
	new Sprite(352, 184, 8, 7, context),
	new Sprite(360, 184, 8, 7, context),
	new Sprite(328, 191, 8, 7, context),
	new Sprite(336, 191, 8, 7, context),
	new Sprite(344, 191, 8, 7, context),
	new Sprite(352, 191, 8, 7, context),
	new Sprite(360, 191, 8, 7, context),
];

const drawTanks = tanks => {
	if (!tanks.length) return;
	const sprite = new Sprite(320.25, 192.75, 8.5, 7.75);
	let y = 70;
	let counter = 0;
	tanks.forEach((_, idx) => {
		if (idx % 2 === 0) {
			tank.draw(695, y, 15);
		} else {
			tank.draw(670, y, 15);
		}

		if (counter === 2) {
			y += 20;
			counter = 0;
		} else {
			counter += 1;
		}
	});
};

const drawLives = lives => {
	const tank = new Sprite(376.5, 144.5, 8, 8.5);
	const live = numbers[lives];
	tank.draw(670, 380, 20);
	live.draw(700, 380, 20);
};

const drawStageNum = stageNum => {
	const number = numbers[stageNum];
	flag.draw(670, 450, 40);
	number.draw(690, 485, 20);
};

export default {
	draw(stageNum, lives, tanks) {
		drawTanks(tanks);
		drawLives(lives);
		drawStageNum(stageNum);
	},
	clearScreen() {
		context.clearRect(0, 0, 600, 600);
		context.beginPath();
	},
};
