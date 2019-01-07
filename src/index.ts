const sprite = require('./assets/sprites.png');
import loadImage from './utils/loadImage';
import keyboard from './keyboard';
import tileMap from './TileMap';
import canvas from './canvas';
import entityPool from './entityPool';
import Player from './entities/Player';
import Enemy from './entities/Enemy';
import { Direction } from './entities/Entity';
import { Types } from './entities/PowerUp';
import collisionManager from './collisionManager';
import Game from './Game';

async function main() {
	canvas.image = await loadImage(sprite);
	keyboard.listenToEvents();

	entityPool.add(new Player({ x: 0, y: 300 }));

	// entityPool.add(new Enemy({ x: 10, y: 40, direction: Direction.top, type: 2 }));
	// entityPool.add(new Enemy({ x: 10, y: 80, direction: Direction.right, type: 2 }));
	// entityPool.add(new Enemy({ x: 10, y: 120, direction: Direction.bottom, type: 2 }));
	// entityPool.add(new Enemy({ x: 10, y: 160, direction: Direction.left, type: 2 }));

	let myWindow = window as any;
	let p = entityPool.pool[1];
	myWindow.map = tileMap;
	myWindow.getP = () => {
		console.log({
			x: p.x,
			y: p.y,
			// prevX: p.prevX,
			// prevY: p.prevY,
			point1: p.getCollisionPoints()[0],
			point2: p.getCollisionPoints()[1],
		});
	};
	myWindow.entities = entityPool.pool;

	const game = new Game();
	return game.createLoop();
}

main();
