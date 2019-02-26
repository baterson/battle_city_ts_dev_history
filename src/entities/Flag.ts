import { Entity } from './Entity';
import { Vector, assetsHolder } from '../utils';
import { Bullet } from './Bullet';

class Flag extends Entity {
	constructor() {
		super(new Vector(280, 560), new Vector(40, 40));
	}

	render(game) {
		// if game.over()
		// TODO: Death
		// if (this.isDeath) {
		//     game.sprites[`${this.type}Death`](this.x, this.y, this.side);
		// } else {
		assetsHolder.sprites.flag(this.position, this.size);
	}

	resolveEntityCollision(other, game) {
		if (other instanceof Bullet) {
			game.gameOver();
		}
	}
}

export { Flag };
