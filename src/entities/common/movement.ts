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

export { move };
