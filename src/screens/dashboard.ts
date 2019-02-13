import entityManager from '../entityManager';
import c from '../utils/console';

const canvas: any = document.getElementById('dashboard');
const context = canvas.getContext('2d');

const drawTanks = (tanks, tankSprite) => {
	if (!tanks.length) return;
	let y = 70;
	let counter = 0;
	c.c(tanks);
	tanks.forEach((_, idx) => {
		if (idx % 2 === 0) {
			tankSprite(695, y, 15);
		} else {
			tankSprite(670, y, 15);
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
	render(game) {
		const {
			sprites: { numberIcons, flagIcon, playerIcon, tankIcon },
			stage,
		} = game;
		const player: any = entityManager.getPlayer();
		drawTanks(stage.tanks, tankIcon);
		flagIcon(670, 450, 40);
		playerIcon(670, 380, 20);
		numberIcons[stage.number + 1](690, 485, 20);
		numberIcons[player ? player.lives : 0](700, 380, 20);
	},
	clearScreen() {
		context.clearRect(0, 0, 750, 700);
		context.beginPath();
	},
};
