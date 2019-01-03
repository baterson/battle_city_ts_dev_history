const sprite = require('./assets/sprites.png');
import createLoop from './utils/loop';
import loadImage from './utils/loadImage';
import { Layers } from './tileMap';
import keyboard from './keyboard';
import tileMap from './tileMap';
import canvas from './canvas';
import entityPool from './entityPool';
import { bullet, player, enemy } from './entityConstructors';
import { Directon } from './entities/Entity';
import collisionManager from './collisionManager';

// 15 x 15

async function main() {
	canvas.image = await loadImage(sprite);
	keyboard.listenToEvents();

	entityPool.add(player());
	entityPool.add(enemy(120, 40, Directon.bottom));

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

	return createLoop(
		deltaTime => {
			entityPool.forEach(entity => {
				entity.update(deltaTime);
				collisionManager.manageTiles();
				collisionManager.manageEntities();
			});
			entityPool.removeEntities();
		},
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
