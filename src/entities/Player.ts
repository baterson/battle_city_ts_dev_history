import { Entity } from './Entity';
import { Vector, assetsHolder, animateVariableSprites, getAnimationIndex } from '../utils';
import { TimeManager } from '../managers/TimeManager';
import { Direction, PowerupTypes, PlayerPower, Player as IPlayer } from '../types';
import {
	PLAYER_SPAWN_POSITION,
	TANK_SIZE,
	PLAYER_STATS,
	SPAWN_FRAMES,
	DEATH_FRAMES,
	INVINCIBLE_FRAMES,
} from '../constants';
import { animateMovement, move, goBack, shot, isOutOfScreen, getFrontCollisionPoints, destroy } from './commonMethods';
import { powerupEvents, Powerup } from './Powerup';
import keyboard, { Keys } from '../keyboard';
import { Bullet } from './Bullet';
import { SoundManager } from '../managers';

function powerupObserver(powerupType: PowerupTypes) {
	if (powerupType === PowerupTypes.Tank) {
		this.lives += 1;
	} else if (powerupType === PowerupTypes.Helmet) {
		this.timeManager.setTimer('invincible', INVINCIBLE_FRAMES);
	} else if (powerupType === PowerupTypes.Star && this.power < PlayerPower.Second) {
		this.power += 1;
	}
}

export interface Player extends IPlayer {}

export class Player extends Entity {
	// Экспортировать только интерфейсы методов и описать все типы внутри класса, расширить Player этими интерфейсами
	public prevPosition: Vector;
	public direction: Direction;
	public lives: number;
	public power: PlayerPower;
	public soundManager: SoundManager;

	constructor() {
		super(new Vector(...PLAYER_SPAWN_POSITION), new Vector(...TANK_SIZE));
		this.prevPosition = new Vector(...PLAYER_SPAWN_POSITION);
		this.direction = Direction.Top;
		this.lives = 1;
		this.power = PlayerPower.Default;
		this.soundManager = new SoundManager({
			neutral: assetsHolder.audio.neutral,
			move: assetsHolder.audio.move,
			destroy: assetsHolder.audio.destroy,
		});

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
			// TODO: REFACTOR to animate in loop, animate
			const invincibleSprites = assetsHolder.sprites.invincible;
			const index = invincible % invincibleSprites.length;
			// const index = Math.floor(game.elapsedTime / 0.1) % invincibleSprites.length;
			invincibleSprites[index](this.position, this.size);
		}
		this.animateMovement(assetsHolder.sprites.player[this.power][this.direction]);
	}

	processInput() {
		const key = keyboard.getKey();
		let isMoving = true;

		if (key === Keys.ArrowUp) {
			this.direction = Direction.Top;
		} else if (key === Keys.ArrowDown) {
			this.direction = Direction.Bottom;
		} else if (key === Keys.ArrowLeft) {
			this.direction = Direction.Left;
		} else if (key === Keys.ArrowRight) {
			this.direction = Direction.Right;
		} else {
			this.soundManager.pause('move');
			isMoving = false;
		}

		if (key === Keys.Space) {
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

	resolveEntityCollision(other, game) {
		// TODO: check for spawn
		if (other instanceof Powerup) {
			return;
		} else if (other instanceof Bullet) {
			const invincible = this.timeManager.getTimer('invincible');
			if (invincible) return;

			this.timeManager.setTimer('death', DEATH_FRAMES);
			this.lives -= 1;
			if (this.lives === 0) {
				this.destroy();
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

Player.prototype.animateMovement = animateMovement;
Player.prototype.move = move;
Player.prototype.goBack = goBack;
Player.prototype.shot = shot;
Player.prototype.isOutOfScreen = isOutOfScreen;
Player.prototype.getFrontCollisionPoints = getFrontCollisionPoints;
Player.prototype.destroy = destroy;
