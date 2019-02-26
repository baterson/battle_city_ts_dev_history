import { Entity } from './Entity';
import { Vector, assetsHolder } from '../utils';
import { Direction, PowerupTypes, TankTypes, Enemy as IEnemy } from '../types';
import { TANK_SIZE, SPAWN_FRAMES, DEATH_FRAMES, FREEZE_FRAMES, ENEMY_STATS } from '../constants';
import { animateMovement, move, goBack, shot, isOutOfScreen, getFrontCollisionPoints, destroy } from './commonMethods';
import { getAnimIndex } from '../utils';
import { SoundManager } from '../managers';
import entityManager from '../entityManager';
import { Player } from './Player';
import { Bullet } from './Bullet';
import { Powerup, powerupEvents } from './Powerup';

function powerupObserver(powerupType) {
	if (powerupType === PowerupTypes.Stopwatch) {
		this.timeManager.setTimer('freeze', FREEZE_FRAMES);
	} else if (powerupType === PowerupTypes.Grenade) {
		this.die();
	}
}

interface Enemy extends IEnemy {}

class Enemy extends Entity {
	public prevPosition: Vector;
	public type: TankTypes;
	public direction: Direction;
	public lives: number;
	public soundManager: SoundManager;

	constructor(type: TankTypes, position: Vector) {
		super(position, new Vector(...TANK_SIZE));
		this.type = type;
		this.lives = ENEMY_STATS[type].lives;
		this.prevPosition = new Vector(35, 35);
		this.direction = Direction.Bottom;
		this.soundManager = new SoundManager({
			destroy: assetsHolder.audio.destroy,
		});

		this.timeManager.setTimer('spawn', SPAWN_FRAMES);
		powerupEvents.subscribe(this.id, powerupObserver.bind(this));
	}

	update(game) {
		const spawn = this.timeManager.getTimer('spawn');
		const death = this.timeManager.getTimer('death');
		const freeze = this.timeManager.getTimer('freeze');
		this.timeManager.decrementTimers();

		if (spawn || death || freeze) {
			return;
		} else {
			this.aiMove(game);
		}
	}

	render(game) {
		const spawn = this.timeManager.getTimer('spawn');
		const death = this.timeManager.getTimer('death');

		if (spawn) {
			// TODO: Refactor animIndex
			const sprites = assetsHolder.sprites.tankSpawnAnimation;
			const index = getAnimIndex(SPAWN_FRAMES, spawn, sprites.length - 1);
			sprites[index](this.position, this.size);
			return;
		} else if (death) {
			const sprites = assetsHolder.sprites.tankDeathAnimation;
			const index = getAnimIndex(DEATH_FRAMES, death, sprites.length - 1);
			sprites[index](this.position, this.size);
			return;
		}

		if (this.type === TankTypes.Armored) {
			this.animateMovement(assetsHolder.sprites.enemy[this.type][this.lives][this.direction]);
		} else {
			this.animateMovement(assetsHolder.sprites.enemy[this.type][this.direction]);
		}
	}

	//Rename
	aiMove(game) {
		const { shotCD, velocity } = ENEMY_STATS[this.type];

		if (
			Math.abs(Math.floor(this.prevPosition.x - this.position.x)) > 120 ||
			Math.abs(Math.floor(this.prevPosition.y - this.position.y)) > 120
		) {
			this.shot(shotCD);
			this.setRandomDirection();
			this.move(velocity);
		} else {
			this.move(velocity);
		}
	}

	resolveEdgeCollision() {
		this.goBack();
		this.setOpositeDirection();
	}

	resolveTileCollision() {
		this.goBack();
		this.shot(ENEMY_STATS[this.type].shotCD);
	}

	resolveEntityCollision(other, game) {
		if (other instanceof Powerup) {
			return;
		} else if (other instanceof Bullet && other.shooter instanceof Player) {
			if (this.lives === 1) {
				this.die();
			} else {
				this.lives -= 1;
			}
		} else if (other instanceof Enemy) {
			this.goBack();
			this.setOpositeDirection();
		} else if (other instanceof Player) {
			this.shot(ENEMY_STATS[this.type].shotCD);
			this.goBack();
			this.setOpositeDirection();
		}
	}

	die() {
		this.timeManager.setTimer('death', DEATH_FRAMES);
		entityManager.toRemove(this.id);
		powerupEvents.unsubscribe(this.id);
	}

	setRandomDirection() {
		const items = [Direction.Top, Direction.Right, Direction.Bottom, Direction.Left].filter(
			direction => direction !== this.direction
		);
		const index = Math.floor(Math.random() * items.length);
		this.direction = items[index];
	}

	setOpositeDirection() {
		if (this.direction === Direction.Top) {
			this.direction = Direction.Bottom;
		} else if (this.direction === Direction.Bottom) {
			this.direction = Direction.Top;
		} else if (this.direction === Direction.Right) {
			this.direction = Direction.Left;
		} else {
			this.direction = Direction.Right;
		}
	}
}

Enemy.prototype.animateMovement = animateMovement;
Enemy.prototype.goBack = goBack;
Enemy.prototype.isOutOfScreen = isOutOfScreen;
Enemy.prototype.move = move;
Enemy.prototype.shot = shot;
Enemy.prototype.getFrontCollisionPoints = getFrontCollisionPoints;
Enemy.prototype.destroy = destroy;

export { Enemy };
