import { Direction } from './constants';

function getCollisionPoints() {
	if (this.direction === Direction.Top) {
		return [
			{ x: this.x, y: this.y },
			{ x: this.x + this.side / 2, y: this.y },
			{ x: this.x + this.side, y: this.y },
		];
	} else if (this.direction === Direction.Right) {
		return [
			{ x: this.x + this.side, y: this.y },
			{ x: this.x + this.side, y: this.y + this.side / 2 },
			{ x: this.x + this.side, y: this.y + this.side },
		];
	} else if (this.direction === Direction.Bottom) {
		return [
			{ x: this.x, y: this.y + this.side },
			{ x: this.x + this.side / 2, y: this.y + this.side },
			{ x: this.x + this.side, y: this.y + this.side },
		];
	} else if (this.direction === Direction.Left) {
		return [
			{ x: this.x, y: this.y },
			{ x: this.x, y: this.y + this.side / 2 },
			{ x: this.x, y: this.y + this.side },
		];
	}
}

function isOutOfScreen() {
	const box = this.getBoundingBox();
	return box.top < 0 || box.bottom > 595 || box.left < 0 || box.right > 595;
}

export { getCollisionPoints, isOutOfScreen };
