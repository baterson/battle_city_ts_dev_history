import { FLAG_SPRITE, FLAG_DEATH_SPRITE } from '../constants';
import GameObject from './GameObject';
import Bullet from './Bullet';

class Flag extends GameObject {
	public sprite;

	constructor(x = 280, y = 560, side = 40) {
		super(x, y, side);
		this.sprite = FLAG_SPRITE;
	}

	render() {
		this.sprite.draw(this.x, this.y, this.side);
	}

	resolveEntityCollision(other, level) {
		if (other instanceof Bullet) {
			this.sprite = FLAG_DEATH_SPRITE;
			level.gameOver();
		}
	}
}

export default Flag;
