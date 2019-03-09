import { Entity } from './Entity';
import { assetsHolder } from '../utils';
import { Bullet } from './Bullet';
import { entityManager } from '../managers';

export class Flag extends Entity {
	public isDeath = false;

	constructor() {
		super({ x: 280, y: 560 }, { x: 40, y: 40 });
	}

	render() {
		if (this.isDeath) {
			assetsHolder.sprites.flagDeath(this.position, this.size);
		} else {
			assetsHolder.sprites.flag(this.position, this.size);
		}
	}

	resolveEntityCollision(other) {
		if (other instanceof Bullet) {
			this.isDeath = true;
			entityManager.toRemove(this.id);
		}
	}
}
