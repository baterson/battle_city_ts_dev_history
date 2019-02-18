const sprite = require('./assets/sprites.png');
import loadImage from './utils/loadImage';
import keyboard from './keyboard';
import tileMap from './TileMap';
import entityManager from './entityManager';
import Game from './Game';

async function main() {
	//game = new Game()
	//await game.setupSprites()
	//return game.createLoop()
	const image = await loadImage(sprite);
	const game = new Game(image);
	keyboard.listenToEvents(game);
	// pool.add(new Enemy(10, 40, 0, 2));
	// pool.add(new Enemy({ x: 10, y: 80, direction: Direction.right, type: 2 }));
	// entityPool.add(new Enemy({ x: 50, y: 80, direction: Direction.bottom, type: 2 }));
	// entityPool.add(new Enemy({ x: 10, y: 160, direction: Direction.left, type: 2 }));

	let myWindow = window as any;
	let p = entityManager.pool[1];
	myWindow.map = tileMap;
	myWindow.getP = () => {
		console.log({
			x: p.x,
			y: p.y,
			// prevX: p.prevX,
			// prevY: p.prevY,
		});
	};
	myWindow.ent = entityManager.pool;

	return game.createLoop();
}

main();
