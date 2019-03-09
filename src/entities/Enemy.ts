import { Tank } from './Tank';
import { assetsHolder, animateVariableSprites } from '../utils';
import { Direction, PowerupTypes, TankTypes, Vector } from '../types';
import { TANK_SIZE, SPAWN_FRAMES, DEATH_FRAMES, FREEZE_FRAMES, ENEMY_STATS } from '../constants';
import { SoundManager, TimeManager } from '../managers';
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

export class Enemy extends Tank {
	public type: TankTypes;
	public lives: number;
	public timeManager: TimeManager<'spawn' | 'death' | 'freeze' | 'shotCD'>;
	public soundManager: SoundManager<'explode'>;

	constructor(type: TankTypes, position: Vector) {
		super(position, { ...TANK_SIZE }, Direction.Bottom);
		this.type = type;
		this.lives = ENEMY_STATS[type].lives;
		this.timeManager = new TimeManager();
		this.soundManager = new SoundManager(['explode']);

		this.timeManager.setTimer('spawn', SPAWN_FRAMES);
		powerupEvents.subscribe(this.id, powerupObserver.bind(this));
	}

	update() {
		const spawn = this.timeManager.getTimer('spawn');
		const death = this.timeManager.getTimer('death');
		const freeze = this.timeManager.getTimer('freeze');
		this.timeManager.decrementTimers();

		if (spawn || death || freeze) {
			return;
		} else {
			this.aiMove();
		}
	}

	render() {
		const spawn = this.timeManager.getTimer('spawn');
		const death = this.timeManager.getTimer('death');

		if (spawn) {
			return animateVariableSprites(this.position, assetsHolder.variableSprites.tankSpawn, SPAWN_FRAMES, spawn);
		} else if (death) {
			const step = DEATH_FRAMES / assetsHolder.variableSprites.tankDestruction.length;
			var c = Math.floor(death / step);
			console.log('C', c);

			return animateVariableSprites(this.position, assetsHolder.variableSprites.tankDestruction, DEATH_FRAMES, death);
		}

		if (this.type === TankTypes.Armored) {
			this.animateMovement(assetsHolder.sprites.enemy[this.type][this.lives][this.direction]);
		} else {
			this.animateMovement(assetsHolder.sprites.enemy[this.type][this.direction]);
		}
	}

	//Rename
	aiMove() {
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
		// this.shot(ENEMY_STATS[this.type].shotCD);
	}

	resolveEntityCollision(other) {
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
