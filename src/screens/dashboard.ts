const canvas: any = document.getElementById('dashboard');
const context = canvas.getContext('2d');

const drawTanks = (tanks, tankSprite) => {
	if (!tanks.length) return;
	let y = 70;
	let counter = 0;
	tanks.forEach((_, idx) => {
		if (idx % 2 === 0) {
			tankSprite({ x: 695, y }, { x: 15, y: 15 });
		} else {
			tankSprite({ x: 670, y }, { x: 15, y: 15 });
		}

		if (counter === 2) {
			y += 20;
			counter = 0;
		} else {
			counter += 1;
		}
	});
};

export default {
	canvas,
	context,
	render(playerLives, stageNum, tanksCount, gameSprites) {
		const { numberIcons, flagIcon, playerIcon, tankIcon } = gameSprites;
		drawTanks(tanksCount, tankIcon);
		flagIcon({ x: 670, y: 450 }, { x: 50, y: 40 });
		playerIcon({ x: 670, y: 380 }, { x: 20, y: 20 });
		numberIcons[stageNum]({ x: 690, y: 485 }, { x: 20, y: 20 });
		numberIcons[playerLives]({ x: 700, y: 380 }, { x: 20, y: 20 });
	},
	clearScreen() {
		// TODO: get from canvas
		context.clearRect(0, 0, 750, 700);
		context.beginPath();
	},
};
