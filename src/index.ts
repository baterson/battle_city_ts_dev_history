const sprite = require('./assets/sprites.png');
const destroy = require('./assets/destroy.wav');
const hit = require('./assets/hit.wav');
const neutral = require('./assets/neutral.wav');
const powerup = require('./assets/powerup.wav');
const move = require('./assets/move.wav');
import { setupAudio, setupSprites } from './utils';
import { audioManager } from './utils/audioManager';
import { assetsHolder } from './utils/assetsHolder';
import loadImage from './utils/loadImage';
import keyboard from './keyboard';
import Game from './Game';

async function main() {
	await assetsHolder.loadSprite(sprite);
	assetsHolder.loadAudio({ destroy, hit, neutral, powerup, move });

	console.log('assetsHolder', assetsHolder);
	const image = await loadImage(sprite);
	const sprites = setupSprites(image);
	const audio = setupAudio({ destroy, hit, neutral, powerup, move });

	audioManager.setupTracks({ destroy, hit, neutral, powerup, move }, ['neutral', 'move']);
	const game = new Game(sprites, audio);
	keyboard.listenToEvents(game);
	return game.createLoop();
}

main();
