import Entity, { Direction } from './Entity';
import entityPool from '../entityPool';
import Bullet, { BULLET_SIDE } from './Bullet';

const TANK_SIDE = 35;
class Tank extends Entity {
	shot = () => {
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
		entityPool.add(new Bullet({ x: bulletArgs.x, y: bulletArgs.y, direction: this.direction }));
	};
}

export { TANK_SIDE };
export default Tank;
