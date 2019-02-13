import { Direction } from './constants';
import c from '../../utils/console';

function move(deltaTime, velocity) {
	this.prevPosition.set(this.position);

	if (this.direction === Direction.Top) {
		this.position.y -= velocity * deltaTime;
	} else if (this.direction === Direction.Bottom) {
		this.position.y += velocity * deltaTime;
	} else if (this.direction === Direction.Left) {
		this.position.x -= velocity * deltaTime;
	} else if (this.direction === Direction.Right) {
		this.position.x += velocity * deltaTime;
	}
}

function goBack() {
	this.position.set(this.prevPosition);
}

function setRandomDirection() {
	const items = [Direction.Top, Direction.Right, Direction.Bottom, Direction.Left].filter(
		direction => direction !== this.direction
	);
	const index = Math.floor(Math.random() * items.length);
	this.direction = items[index];
}

function setOpositeDirection() {
	if (this.direction === Direction.Top) {
		this.direction = Direction.Bottom;
	} else if (this.direction === Direction.Bottom) {
		this.direction = Direction.Top;
	} else if (this.direction === Direction.Right) {
		this.direction = Direction.Left;
	} else {
		this.direction = Direction.Right;
	}
}

export { move, goBack, setRandomDirection, setOpositeDirection };
