import Tank, { TANK_SIDE } from './Tank';
import Sprite from '../Sprite';
import { Direction } from './Entity';
import keyboard, { Keys } from '../keyboard';
import c from '../utils/console';

const sprites = {
	[Direction.top]: [new Sprite(0, 0, 16, 15), new Sprite(16, 0, 16, 15)],
	[Direction.bottom]: [new Sprite(64, 0, 16, 15), new Sprite(80, 0, 16, 15)],
	[Direction.right]: [new Sprite(96, 0, 16, 15), new Sprite(112, 0, 16, 15)],
	[Direction.left]: [new Sprite(32, 0, 16, 15), new Sprite(48, 0, 16, 15)],
};

class Player extends Tank {
	private canShot: boolean;

	constructor({
		// TODO: update direction
		x = 0,
		y = 0,
		side = TANK_SIDE,
		direction = Direction.top,
		velocity = 180,
	}) {
		super({ x, y, side, direction, velocity, sprites: sprites });
	}

	update(deltaTime) {
		this.processInput(deltaTime);
	}

	render = () => {
		const frame = this.resolveFrame();
		frame.draw(this.x, this.y, this.side);
	};

	processInput = deltaTime => {
		this.prevY = this.y;
		this.prevX = this.x;
		const { keyStates } = keyboard;
		const movement = keyboard.getMovement();

		if (movement === Keys.ArrowUp) {
			this.direction = Direction.top;
			this.move(deltaTime);
		} else if (movement === Keys.ArrowDown) {
			this.direction = Direction.bottom;
			this.move(deltaTime);
		} else if (movement === Keys.ArrowLeft) {
			this.direction = Direction.left;
			this.move(deltaTime);
		} else if (movement === Keys.ArrowRight) {
			this.direction = Direction.right;
			this.move(deltaTime);
		}

		if (keyStates.Space) {
			if (this.canShot) {
				this.shot();
			}
			this.canShot = false;
		} else {
			this.canShot = true;
		}
	};

	resolveEntityCollision(other, level) {
		this.x = this.prevX;
		this.y = this.prevY;
	}
}

export default Player;
