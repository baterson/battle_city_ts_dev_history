import { Direction } from './constants';

const getAnimIndex = (length, left, spritesLength) => {
	const step = length / spritesLength;
	return Math.floor(left / step);
};

function animateMovement(sprites) {
	let distance;
	if (this.direction === Direction.Left || this.direction === Direction.Right) {
		distance = this.position.x;
	} else {
		distance = this.position.y;
	}
	const index = Math.floor(distance) % sprites.length;
	sprites[index](this.position, this.size);
}

export { getAnimIndex, animateMovement };
