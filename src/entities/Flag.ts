import Entity, { Direction } from './Entity';
import Bullet from './Bullet';
import Sprite from '../Sprite';

const sprites = {
	[Direction.top]: [new Sprite(304.5, 33, 16, 15.25)],
};

const deathSprites = [{ sprite: new Sprite(304, 33, 16, 15.25), side: 40 }];

class Flag extends Entity {
	constructor() {
		super({
			x: 280,
			y: 560,
			side: 40,
			direction: Direction.top,
			velocity: 0,
			sprites: sprites,
			deathTimer: deathSprites.length,
			deathSprites: deathSprites,
		});
	}

	resolveEntityCollision(other, level) {
		if (other instanceof Bullet) {
			this.destroy();
			level.gameOver();
		}
	}
}

export default Flag;
