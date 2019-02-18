import c from './utils/console';
import entityManager from './entityManager';

enum Keys {
	ArrowUp = 'ArrowUp',
	ArrowRight = 'ArrowRight',
	ArrowDown = 'ArrowDown',
	ArrowLeft = 'ArrowLeft',
	Space = 'Space',
}

class Keyboard {
	public queue;

	constructor() {
		this.queue = new Set();
	}

	handleEvent(event, game) {
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
				p.resolveEntityCollision({ type: 'bullet', state: {} }, game);
			}
		}
		if (!Keys[code]) return;

		if (type === 'keydown') {
			this.queue.add(code);
		} else {
			this.queue.delete(code);
		}
	}

	getKey() {
		return Array.from(this.queue).pop();
	}

	listenToEvents(game) {
		['keydown', 'keyup'].forEach(eventName => {
			window.addEventListener(eventName, event => {
				this.handleEvent(event, game);
			});
		});
	}
}

export { Keys };
export default new Keyboard();
