import { Entity } from './Entity';
import { Vector } from '../utils/vector';
import { TimerManager } from '../utils/TimerManager';
import { Direction, getAnimIndex, animateMovement, move, shot, TankTypes, goBack } from './common';
import entityManager from '../entityManager';
import { Player } from './Player';
import { Bullet } from './Bullet';

const statsByTankType = {
	[TankTypes.Default]: {
		velocity: 100,
		shotCD: 150,
		lives: 1,
	},
	[TankTypes.Fast]: {
		velocity: 200,
		shotCD: 120,
		lives: 1,
	},
	[TankTypes.Armored]: {
		velocity: 90,
		shotCD: 100,
		lives: 3,
	},
};

class Enemy extends Entity {
	public prevPosition: Vector;
	public type: TankTypes;
	public direction: Direction;
	public lives: number;
	public timers: TimerManager;

	constructor(type: TankTypes, position: Vector) {
		super(position, new Vector(35, 35));
		console.log('type', type);
		this.type = type;
		this.lives = statsByTankType[type].lives;
		this.prevPosition = new Vector(35, 35);
		this.direction = Direction.Bottom;
		this.timers = new TimerManager();
	}

	update(game) {
		const spawn = this.timers.getTimer('spawn');
		const death = this.timers.getTimer('death');

		if (spawn || death) {
			return;
		} else {
			this.move(game.deltaTime, statsByTankType[this.type].velocity);
		}
		// else if (this.freezeTick && this.freezeTick + FREEZE_DELAY > game.ticks) {
		//     return;
		// }
	}

	render(game) {
		const spawn = this.timers.getTimer('spawn');
		const death = this.timers.getTimer('death');

		if (spawn) {
			// TODO: Refactor animIndex
			// TODO: move this part to function
			const sprites = game.sprites.tankSpawnAnimation;
			const index = getAnimIndex(1, spawn, sprites.length - 1);
			sprites[index](this.position, this.size);
			return;
		} else if (death) {
			const sprites = game.sprites.tankDeathAnimation;
			const index = getAnimIndex(1, death, sprites.length - 1);
			sprites[index](this.position, this.size);
			return;
		}
		this.animateMovement(game.sprites[`enemy${this.type}${this.lives}`][this.direction]);
	}

	//Rename
	aiMove(game) {
		const { shotCD, velocity } = statsByTankType[this.type];

		if (
			Math.abs(Math.floor(this.prevPosition.x - this.position.x)) > 120 ||
			Math.abs(Math.floor(this.prevPosition.y - this.position.y)) > 120
		) {
			this.shot(shotCD);
			this.setRandomDirection();
			this.move(game.deltaTime, velocity);
		} else {
			this.move(game.deltaTime, velocity);
		}
	}

	resolveEdgeCollision() {
		this.setOpositeDirection();
	}

	resolveTileCollision() {
		const { shotCD } = statsByTankType[this.type];
		this.goBack();
		this.shot(shotCD);
	}

	resolveEntityCollision(other, game, initiator) {
		if (other instanceof Bullet && other.shooter instanceof Player) {
			if (this.lives === 1) {
				this.timers.setTimer('death');
				entityManager.toRemove(this.id);
			} else {
				this.lives -= 1;
			}
		} else if (other instanceof Enemy && initiator.id === this.id) {
			this.goBack();
			this.setOpositeDirection();
		} else if (other.type === 'player') {
			this.goBack();
			this.shot();
		}
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

interface Enemy {
	// TODO: Types
	animateMovement(sprites): void;
	move(deltaTime: number, velocity: number): void;
	shot(cd?: number): void;
	goBack(): void;
}

Enemy.prototype.animateMovement = animateMovement;
Enemy.prototype.goBack = goBack;
Enemy.prototype.move = move;
Enemy.prototype.shot = shot;

export { Enemy };
