import Entity from './Entity';
import Player from './Player';
import entityPool from '../entityPool';
import idGen from '../utils/idGen';
import Sprite from '../Sprite';

const POWERUP_SIDE = 35;

enum Types {
	shovel,
	star,
	grenade,
	tank,
}

const Sprites = {
	[Types.shovel]: new Sprite(288, 112, 15, 14),
	[Types.star]: new Sprite(303.25, 112, 15, 14),
	[Types.grenade]: new Sprite(318.5, 112, 15, 14),
};

const grenadeReaction = () => {
	const enemies = entityPool.getEnemies();
	enemies.forEach(enemy => entityPool.toRemove(enemy.id));
};

const shovelReaction = level => {};

const reactions = {
	[Types.grenade]: grenadeReaction,
	[Types.shovel]: shovelReaction,
};

class PowerUp {
	public id;
	public x;
	public y;
	public side;
	public type;
	private sprite;
	public movable;

	constructor(x, y, type, sprite) {
		this.id = idGen();
		this.x = x;
		this.y = y;
		this.side = POWERUP_SIDE;
		this.type = type;
		this.sprite = sprite;
		this.movable = false;
	}

	update(deltaTime) {}

	render() {
		this.sprite.draw(this.x, this.y, POWERUP_SIDE);
	}

	resolveEntityCollision(other, level) {
		if (other instanceof Player) {
			reactions[this.type](level);
			entityPool.toRemove(this.id);
		}
	}
}

export { Types, Sprites };
export default PowerUp;
