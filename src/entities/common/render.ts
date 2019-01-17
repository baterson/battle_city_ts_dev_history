import { Direction } from './constants';

function renderStatic() {
	this.sprite(this.x, this.y, this.side);
}

function renderMovable() {
	// TODO: this types
	let distance;
	const sprites = this.sprites[this.direction];
	if (this.direction === Direction.left || this.direction === Direction.right) {
		distance = this.x;
	} else {
		distance = this.y;
	}
	const index = Math.floor(distance / 2) % sprites.length;
	sprites[index](this.x, this.y, this.side);
}

function renderAnimated() {
	if (this.deathTick) {
		const { sprite, side } = this.deathAnimation[this.deathTick];
		sprite(this.x, this.y, side);
	} else if (this.spawnTick) {
		const { sprite, side } = this.spawnAnimation[this.spawnTick];
		sprite(this.x, this.y, side);
	} else {
		renderMovable.call(this);
	}
}

export { renderMovable, renderStatic, renderAnimated };
