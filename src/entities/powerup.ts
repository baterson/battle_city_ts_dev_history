import entityManager from '../entityManager';
import { Powerups } from './common/constants';

function helmet(game) {}

function grenade(game) {
	const enemies = entityManager.getEnemies();
	enemies.forEach((enemy: any) => {
		enemy.die();
	});
}

function tank(game) {
	const player = entityManager.getPlayer();
	player.lives += 1;
}

function stopwatch(game) {
	const enemies = entityManager.getEnemies();
	enemies.forEach((enemy: any) => {
		enemy.freeze(game);
	});
}

const actions = {
	[Powerups.helmet]: helmet,
	[Powerups.grenade]: grenade,
	[Powerups.tank]: tank,
	[Powerups.stopwatch]: stopwatch,
};

export default function createPowerup(sprites) {
	return function powerup(id, x, y, powerupType) {
		return {
			type: 'powerup',
			id,
			x,
			y,
			side: 40,
			sprite: sprites[powerupType],

			update() {},
			render() {
				this.sprite(this.x, this.y, this.side);
			},
			resolveEntityCollision(other, game) {
				if (other.type === 'player') {
					actions[powerupType](game);
					entityManager.toRemove(this.id);
				}
			},
		};
	};
}
