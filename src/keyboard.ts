import c from './utils/console';
import { entityManager } from './managers';
import { ControlKeys } from './types';
import { Game } from './Game';

export class Keyboard {
	public queue: Set<ControlKeys>;

	constructor() {
		this.queue = new Set();
	}

	handleEvent(event: KeyboardEvent, game: Game) {
		const { code, type } = event;
		if (game.isWaitingForRestart()) {
			return game.restart();
		}

		// TODO: remove it
		if (code === 'KeyC') {
			c.show = !c.show;
		}

		if (code === 'KeyP') {
			const p: any = entityManager.getPlayer();
			console.log(p);
		}
		if (code === 'KeyG') {
			console.log(game);
		}
		if (code === 'KeyR') {
			const p: any = entityManager.getPlayer();
			p.respawn(game);
		}
		if (code === 'KeyK') {
			const p: any = entityManager.getPlayer();
			if (p && p.lives) {
				p.resolveEntityCollision({ type: 'bullet', state: {} });
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
	}
}

export const keyboard = new Keyboard();
