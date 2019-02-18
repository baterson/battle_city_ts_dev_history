import { Direction } from './constants';

function getFrontCollisionPoints() {
	const { x1, x2, y1, y2 } = this.getBoundingBox();
	if (this.direction === Direction.Top) {
		return [[x1, y1], [x2, y1]];
	} else if (this.direction === Direction.Right) {
		return [[x2, y1], [x2, y2]];
	} else if (this.direction === Direction.Bottom) {
		return [[x1, y2], [x2, y2]];
	} else if (this.direction === Direction.Left) {
		return [[x1, y1], [x1, y2]];
	}
}

// function getFrontCollisionPoints() {
// 	const { top, right, bottom, left } = this.getBoundingBox();
// 	if (this.direction === Direction.Top) {
// 		return [[left, top], [right, top]];
// 	} else if (this.direction === Direction.Right) {
// 		return [[right, top], [right, bottom]];
// 	} else if (this.direction === Direction.Bottom) {
// 		return [[left, bottom], [right, bottom]];
// 	} else if (this.direction === Direction.Left) {
// 		return [[left, top], [left, bottom]];
// 	}
// }

function isOutOfScreen() {
	const box = this.getBoundingBox();
	return box.y1 < 0 || box.y2 > 600 || box.x1 < 0 || box.x2 > 600;
}

// function isOutOfScreen() {
// 	const box = this.getBoundingBox();
// 	return box.top < 0 || box.bottom > 600 || box.left < 0 || box.right > 600;
// }

export { getFrontCollisionPoints, isOutOfScreen };
