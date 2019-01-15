const canvas: any = document.getElementById('dashboard');
const context = canvas.getContext('2d');

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

const drawStageNum = (sprites, stageNum => {
	const number = numbers[stageNum];
	flag.draw(670, 450, 40);
	number.draw(690, 485, 20);
};

export default {
	canvas,
	context,
	draw(game) {
		const {sprites: {numbers}, stage} = game
		// get player lives
		const liveNumber = numbers[]
		tank.draw(670, 380, 20);
		live.draw(700, 380, 20);
	
		drawTanks(tanks);
		drawLives(lives);
		drawStageNum(stage.number, sprites);
	},
	clearScreen() {
		context.clearRect(0, 0, 600, 600);
		context.beginPath();
	},
};
