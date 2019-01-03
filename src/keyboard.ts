import c from './utils/console';
import enemy from './entities/enemy';
import entityPool from './entityPool';
import { Directon } from './entities/Entity';

enum KeyState {
	released,
	pressed,
}

class Keyboard {
	public keyStates;

	constructor() {
		this.keyStates = {
			ArrowLeft: KeyState.released,
			ArrowRight: KeyState.released,
			ArrowDown: KeyState.released,
			ArrowUp: KeyState.released,
			Space: KeyState.released,
		};
	}

	handleEvent(event) {
		const { code, type } = event;
		if (code === 'KeyC') {
			c.show = !c.show;
		}
		if (code === 'KeyP') {
			let mywindow: any = window as any;
			mywindow.getP();
		}
		if (!this.keyStates.hasOwnProperty(code)) return;

		if (type === 'keydown') {
			this.keyStates[code] = KeyState.pressed;
		} else {
			this.keyStates[code] = KeyState.released;
		}
	}

	listenToEvents() {
		['keydown', 'keyup'].forEach(eventName => {
			window.addEventListener(eventName, event => {
				this.handleEvent(event);
			});
		});
	}
}

export { KeyState };
export default new Keyboard();
