import { Direction, PLAYER_SPRITES, PLAYER_SPAWN_POSITION, TANK_DEATH_TIMER, TANK_SPAWN_TIMER } from '../constants';
import keyboard, { Keys } from '../keyboard';
import Tank from './Tank';
import Bullet from './Bullet';
import timer from '../timer';

class Player extends Tank {
	public lives;
	constructor() {
		super(PLAYER_SPAWN_POSITION[0], PLAYER_SPAWN_POSITION[1], Direction.top, 180, PLAYER_SPRITES);
		this.lives = 3;
	}

	update(deltaTime, level) {
		super.update(deltaTime, level);
		if (this.isDeath) return;
		this.processInput(deltaTime, level);
	}

	processInput = (deltaTime, level) => {
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
			// TODO: move space in common queue
		} else if (keyStates.Space) {
			this.shot();
		}
	};

	resolveEntityCollision(other, level) {
		if (other.isDeath) return;

		if (other instanceof Bullet) {
			if (this.lives === 0) {
			}

			this.isDeath = true;
			this.lives -= 1;
			timer.set(TANK_DEATH_TIMER, () => this.respawn());
		} else {
			this.goBack();
		}
	}

	respawn() {
		const [x, y] = PLAYER_SPAWN_POSITION;
		this.isSpawning = true;
		this.isDeath = false;
		this.deathTimer = TANK_DEATH_TIMER;
		this.spawnTimer = TANK_SPAWN_TIMER;
		this.x = x;
		this.y = y;
		timer.set(TANK_SPAWN_TIMER, () => {
			this.isSpawning = false;
			this.spawnTimer = TANK_SPAWN_TIMER;
		});
	}
}

export default Player;
