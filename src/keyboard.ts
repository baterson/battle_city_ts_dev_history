import c from './utils/console';
import { entityManager } from './managers';
import { ControlKeys } from './types';
import { Game } from './Game';

export class Keyboard {
	queue: Set<ControlKeys>;

	constructor() {
		this.queue = new Set();
	}

	handleEvent(event: KeyboardEvent, game: Game) {
		const { code, type } = event;
		if (game.isWaitingForRestart()) {
			return game.restart();
		}
		if (game.isStartScreen) {
			return game.play();
		}

		// TODO: remove it
		if (code === 'KeyC') {
			c.show = !c.show;
		}

		if (code === 'KeyV') {
			const p: any = entityManager.getPlayer();
			console.log(
				`\n Prev: ${JSON.stringify(p.prevPosition)} \n Pos: ${JSON.stringify(p.position)} \n Box: ${JSON.stringify(
					p.getBoundingBox()
				)} \n Points: ${JSON.stringify(p.getFrontCollisionPoints())}\n`
			);
			// console.log(p);
		}
		if (code === 'KeyR') {
			const p: any = entityManager.getPlayer();
			p.respawn(game);
		}
		if (code === 'KeyK') {
			const p: any = entityManager.getPlayer();
			if (p && p.lives) {
				p.die();
			}
		}
		if (!ControlKeys[code]) return;

		if (type === 'keydown') {
			this.queue.add(ControlKeys[code]);
		} else {
			this.queue.delete(ControlKeys[code]);
		}
	}

	getKey() {
		return Array.from(this.queue).pop();
	}

	listenToEvents(game: Game) {
		['keydown', 'keyup'].forEach(eventName => {
			window.addEventListener(eventName, (event: KeyboardEvent) => {
				this.handleEvent(event, game);
			});
		});

		//TODO: remove Debug
		window.addEventListener('click', event => {
			const { clientX, clientY } = event;
			const map = game.stage.map;
			const tile = map.lookup({ x: clientX - 60, y: clientY - 60 });
			console.log(JSON.stringify(tile));
		});
	}
}

export const keyboard = new Keyboard();
