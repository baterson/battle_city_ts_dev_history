import c from './utils/console';

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

	handleEvent(event) {
		const { code, type } = event;
		// TODO: remove it
		if (code === 'KeyC') {
			c.show = !c.show;
		}
		if (code === 'KeyP') {
			let mywindow: any = window as any;
			mywindow.getP();
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

	listenToEvents() {
		['keydown', 'keyup'].forEach(eventName => {
			window.addEventListener(eventName, event => {
				this.handleEvent(event);
			});
		});
	}
}

export { Keys };
export default new Keyboard();
