const sprite = require('./assets/sprites.png');
import createLoop from './utils/loop';
import loadImage from './utils/loadImage';
import createTileSprites, { Layers } from './utils/createTileSprites';
import player from './entities/player';
import keyboard from './keyboard';
import tileMap from './tileMap';
import canvas from './canvas';
import entityPool from './entityPool';
import bullet from './entities/bullet';
import { Directon } from './Entity';
import enemy from './entities/enemy';

// 15 x 15

async function main() {
	canvas.image = await loadImage(sprite);
	keyboard.listenToEvents();

	entityPool.add(player());
	entityPool.add(enemy(0, 0, Directon.bottom));

	let myWindow = window as any;
	myWindow.entities = entityPool.pool;

	return createLoop(
		deltaTime => entityPool.forEach(entity => entity.update(deltaTime)),
		() => {
			canvas.context.clearRect(0, 0, 600, 600);
			canvas.context.beginPath();
			tileMap.renderLayer(Layers.under);
			tileMap.renderLayer(Layers.main);
			entityPool.forEach(entity => entity.render());
			tileMap.renderLayer(Layers.over);
		}
	);
}

main();
