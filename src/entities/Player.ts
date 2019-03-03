import { Tank } from './Tank';
import { Vector, assetsHolder, animateVariableSprites } from '../utils';
import { Direction, PowerupTypes, PlayerPower, ControlKeys } from '../types';
import {
	PLAYER_SPAWN_POSITION,
	TANK_SIZE,
	PLAYER_STATS,
	SPAWN_FRAMES,
	DEATH_FRAMES,
	INVINCIBLE_FRAMES,
} from '../constants';
import { powerupEvents, Powerup } from './Powerup';
import { keyboard } from '../keyboard';
import { Bullet } from './Bullet';
import { SoundManager, TimeManager } from '../managers';

function powerupObserver(powerupType: PowerupTypes) {
	if (powerupType === PowerupTypes.Tank) {
		this.lives += 1;
	} else if (powerupType === PowerupTypes.Helmet) {
		this.timeManager.setTimer('invincible', INVINCIBLE_FRAMES);
	} else if (powerupType === PowerupTypes.Star && this.power < PlayerPower.Second) {
		this.power += 1;
	}
}

export class Player extends Tank {
	public prevPosition: Vector;
	public direction: Direction;
	public lives: number;
	public power: PlayerPower;
	public timeManager: TimeManager<'spawn' | 'death' | 'invincible' | 'shotCD'>;
	public soundManager: SoundManager<'explode' | 'neutral' | 'move'>;

	constructor() {
		super(new Vector(...PLAYER_SPAWN_POSITION), new Vector(...TANK_SIZE), Direction.Top);
		this.lives = 1;
		this.power = PlayerPower.Default;
		this.timeManager = new TimeManager();
		this.soundManager = new SoundManager([
			'destroy',
			{
				trackName: 'neutral',
				loop: true,
			},
			{
				trackName: 'move',
				loop: true,
			},
		]);

		this.timeManager.setTimer('spawn', SPAWN_FRAMES);
		this.timeManager.setTimer('invincible', INVINCIBLE_FRAMES);
		powerupEvents.subscribe(this.id, powerupObserver.bind(this));
	}

	update() {
		this.timeManager.decrementTimers();
		const spawn = this.timeManager.getTimer('spawn');
		const death = this.timeManager.getTimer('death');
		if (spawn || death) return;
		this.soundManager.play('neutral');
		this.processInput();
	}

	render() {
		const spawn = this.timeManager.getTimer('spawn');
		const death = this.timeManager.getTimer('death');
		const invincible = this.timeManager.getTimer('invincible');

		if (spawn) {
			return animateVariableSprites(this.position, assetsHolder.variableSprites.tankSpawn, SPAWN_FRAMES, spawn);
		} else if (death) {
			return animateVariableSprites(this.position, assetsHolder.variableSprites.tankDestruction, DEATH_FRAMES, death);
		} else if (invincible) {
			const invincibleSprites = assetsHolder.sprites.invincible;
			const index = invincible % invincibleSprites.length;
			invincibleSprites[index](this.position, this.size);
		}
		this.animateMovement(assetsHolder.sprites.player[this.power][this.direction]);
	}

	processInput() {
		const key = keyboard.getKey();
		let isMoving = true;

		if (key === ControlKeys.ArrowUp) {
			this.direction = Direction.Top;
		} else if (key === ControlKeys.ArrowDown) {
			this.direction = Direction.Bottom;
		} else if (key === ControlKeys.ArrowLeft) {
			this.direction = Direction.Left;
		} else if (key === ControlKeys.ArrowRight) {
			this.direction = Direction.Right;
		} else {
			this.soundManager.pause('move');
			isMoving = false;
		}

		if (key === ControlKeys.Space) {
			this.shot(PLAYER_STATS[this.power].shotCD);
		}

		if (isMoving) {
			this.soundManager.pause('neutral');
			// this.soundManager.play('move');
			this.move(PLAYER_STATS[this.power].velocity);
		}
	}

	resolveEdgeCollision() {
		this.goBack();
	}

	resolveTileCollision() {
		this.goBack();
	}

	resolveEntityCollision(other) {
		if (other instanceof Powerup) {
			return;
		} else if (other instanceof Bullet) {
			const invincible = this.timeManager.getTimer('invincible');
			if (invincible) return;

			this.timeManager.setTimer('death', DEATH_FRAMES);
			this.lives -= 1;
			if (this.lives === 0) {
				this.die();
			}
		} else {
			this.goBack();
		}
	}

	respawn() {
		this.timeManager.setTimer('spawn', SPAWN_FRAMES);
		this.timeManager.setTimer('invincible', INVINCIBLE_FRAMES);
		this.power = PlayerPower.Default;
		this.position = new Vector(...PLAYER_SPAWN_POSITION);
	}
}
