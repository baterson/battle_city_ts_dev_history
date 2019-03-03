import { Entity } from './Entity';
import { assetsHolder } from '../utils';
import { Bullet } from './Bullet';

export class Flag extends Entity {
	constructor() {
		super({ x: 280, y: 560 }, { x: 40, y: 40 });
	}

	render() {
		// if game.over()
		// TODO: Death
		// if (this.isDeath) {
		//     game.sprites[`${this.type}Death`](this.x, this.y, this.side);
		// } else {
		assetsHolder.sprites.flag(this.position, this.size);
	}

	resolveEntityCollision(other) {
		if (other instanceof Bullet) {
			// THIS death
			// game.gameOver();
		}
	}
}
