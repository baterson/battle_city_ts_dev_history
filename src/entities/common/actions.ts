import { Direction, BULLET_SIDE } from './constants';
import entityManager from '../../entityManager';

function shot() {
	if (!this.canShoot) return;

	this.canShoot = false;
	let bulletArgs;

	if (this.direction === Direction.top) {
		bulletArgs = { x: this.x + this.side / 2 - BULLET_SIDE / 2, y: this.y - BULLET_SIDE };
	} else if (this.direction === Direction.right) {
		bulletArgs = { x: this.x + this.side, y: this.y + this.side / 2 - BULLET_SIDE / 2 };
	} else if (this.direction === Direction.bottom) {
		bulletArgs = { x: this.x + this.side / 2 - BULLET_SIDE / 2, y: this.y + this.side };
	} else {
		bulletArgs = { x: this.x - BULLET_SIDE, y: this.y + this.side / 2 - BULLET_SIDE / 2 };
	}

	entityManager.spawnBullet(bulletArgs.x, bulletArgs.y, this.direction, this);
	// timer.set(50, () => (this.canShoot = true));
}

function destroy() {
	this.isDeath = true;
	entityManager.toRemove(this.id);
}

export { shot, destroy };
