import { Entity } from './Entity';
import { Vector } from '../utils/vector';
import { Bullet } from './Bullet';

class Flag extends Entity {
	constructor() {
		super(new Vector(280, 560), new Vector(40, 40));
	}

	update() {}

	render(game) {
		// if game.over()
		// TODO: Death
		// if (this.isDeath) {
		//     game.sprites[`${this.type}Death`](this.x, this.y, this.side);
		// } else {
		game.sprites.flag(this.position, this.size);
	}

	resolveEntityCollision(other, game) {
		if (other instanceof Bullet) {
			game.gameOver();
		}
	}
}

export { Flag };
