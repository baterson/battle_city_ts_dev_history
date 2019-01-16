import { Direction } from './constants';

function move(deltaTime) {
	this.prevY = this.y;
	this.prevX = this.x;

	if (this.direction === Direction.top) {
		this.y -= this.velocity * deltaTime;
	} else if (this.direction === Direction.bottom) {
		this.y += this.velocity * deltaTime;
	} else if (this.direction === Direction.left) {
		this.x -= this.velocity * deltaTime;
	} else if (this.direction === Direction.right) {
		this.x += this.velocity * deltaTime;
	}
}

function goBack() {
	this.x = this.prevX;
	this.y = this.prevY;
}

function setRandomDirection() {
	const items = [Direction.top, Direction.right, Direction.bottom, Direction.left].filter(
		direction => direction !== this.direction
	);
	const index = Math.floor(Math.random() * items.length);
	this.direction = items[index];
}

function setOpositeDirection() {
	if (this.direction === Direction.top) {
		this.direction = Direction.bottom;
	} else if (this.direction === Direction.bottom) {
		this.direction = Direction.top;
	} else if (this.direction === Direction.right) {
		this.direction = Direction.left;
	} else {
		this.direction = Direction.right;
	}
}

export { move, goBack, setRandomDirection, setOpositeDirection };
