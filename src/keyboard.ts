import c from './utils/console';
import entityManager from './entityManager';

enum Keys {
	ArrowUp = 'ArrowUp',
	ArrowRight = 'ArrowRight',
	ArrowDown = 'ArrowDown',
	ArrowLeft = 'ArrowLeft',
	Space = 'Space',
}

// const movement = [Keys.ArrowUp, Keys.ArrowRight, Keys.ArrowDown, Keys.ArrowLeft];

class Keyboard {
	// public shot;
	// public movementQueue;
	public queue;
	// public keyStates;

	constructor() {
		this.queue = new Set();
		// this.movementQueue = new Set();
		// this.keyStates = {
		// 	ArrowUp: false,
		// 	ArrowRight: false,
		// 	ArrowDown: false,
		// 	ArrowLeft: false,
		// 	Space: false,
		// };
	}

	handleEvent(event, game) {
		console.log(game.isLost());
		const { code, type } = event;
		if (game.isLost()) {
			console.log('HERE??');
			return game.restart();
		}

		// TODO: remove it
		if (code === 'KeyC') {
			c.show = !c.show;
		}
		if (code === 'KeyP') {
			let mywindow: any = window as any;
			mywindow.getP();
		}
		if (code === 'KeyK') {
			const p = entityManager.getPlayer();
			if (p && p.lives) {
				p.resolveEntityCollision({ type: 'bullet' });
			}
		}
		if (!Keys[code]) return;

		if (type === 'keydown') {
			this.queue.add(code);
			// this.keyStates[code] = true;
		} else {
			this.queue.delete(code);
			// this.keyStates[code] = false;
		}

		// if (movement.includes(code)) {
		// 	this.keyStates[code] ? this.movementQueue.add(code) : this.movementQueue.delete(code);
		// }
	}

	// getMovement() {
	// 	return Array.from(this.movementQueue).pop();
	// }

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
