import Tank from './Tank';
import { Directon } from './Entity';
import keyboard, { KeyState } from '../keyboard';
import c from '../utils/console';

class Player extends Tank {
	private canShot: boolean;

	update = deltaTime => {
		this.processInput(deltaTime);
	};

	render = () => {
		const frame = this.resolveFrame();
		frame.draw(this.x, this.y, this.side);
	};

	processInput = deltaTime => {
		this.prevY = this.y;
		this.prevX = this.x;
		const { keyStates } = keyboard;

		if (keyStates.ArrowUp === KeyState.pressed) {
			this.direction = Directon.top;
			this.move(deltaTime);
		} else if (keyStates.ArrowDown === KeyState.pressed) {
			this.direction = Directon.bottom;
			this.move(deltaTime);
		} else if (keyStates.ArrowLeft === KeyState.pressed) {
			this.direction = Directon.left;
			this.move(deltaTime);
		} else if (keyStates.ArrowRight === KeyState.pressed) {
			this.direction = Directon.right;
			this.move(deltaTime);
		} else if (keyStates.Space === KeyState.pressed) {
			if (this.canShot) {
				this.shot();
			}
			this.canShot = false;
		} else if (keyStates.Space === KeyState.released) {
			this.canShot = true;
		}
	};

	resolveEntityCollision(other) {
		this.x = this.prevX;
		this.y = this.prevY;
	}
}

export default Player;
