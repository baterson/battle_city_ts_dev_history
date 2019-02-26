const sprite = require('./assets/sprites.png');
const destroy = require('./assets/audio/destroy.wav');
const hit = require('./assets/audio/hit.wav');
const neutral = require('./assets/audio/neutral.wav');
const powerup = require('./assets/audio/powerup.wav');
const move = require('./assets/audio/move.wav');
const start = require('./assets/audio/start.mp3');
import { assetsHolder } from './utils/assetsHolder';
import keyboard from './keyboard';
import Game from './Game';

async function main() {
	await assetsHolder.loadSprite(sprite);
	assetsHolder.loadAudio({ destroy, hit, neutral, powerup, move, start });

	const game = new Game();
	keyboard.listenToEvents(game);
	return game.createLoop();
}

main();
