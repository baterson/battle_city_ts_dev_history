// import {
// 	Direction,
// 	goBack,
// 	getCollisionPoints,
// 	isOutOfScreen,
// 	shot,
// 	move,
// 	PLAYER_SPAWN_POSITION,
// 	PLAYER_VELOCITY,
// 	TANK_SIDE,
// 	Powerups,
// 	getStateRemainingTime,
// } from './common';
// import keyboard, { Keys } from '../keyboard';
// import { powerupEvents } from './powerup';
// import { Vector } from '../utils/vector';
// import entityManager from '../entityManager';

// export enum Power {
// 	Default,
// 	First,
// 	Second,
// }

// const velocityScale = {
// 	[Power.Default]: 1,
// 	[Power.First]: 1.5,
// 	[Power.Second]: 2,
// };

// function powerupObserver(game, powerupType) {
// 	if (powerupType === Powerups.tank) {
// 		this.lives += 1;
// 	} else if (powerupType === Powerups.helmet) {
// 		this.state.invincible = game.elapsedTime;
// 	} else if (powerupType === Powerups.star && this.power < Power.Second) {
// 		this.power += 1;
// 	}
// }

// const setState = (entity, state, timers?) => {
// 	entity.state = { ...entity.state, ...state };
// 	if (timers) {
// 		entity.timers = { ...entity.timers, ...timers };
// 	}
// };

// const getAnimIndex = (length, left, spritesLength) => {
// 	const step = length / spritesLength;
// 	return Math.floor(left / step);
// };

// export function player(id, game) {
// 	// TODO: getstate/setstate bind inside constructor
// 	const entity = {
// 		type: 'player',
// 		id,
// 		position: new Vector(20, 50),
// 		prevPosition: new Vector(20, 50),
// 		side: 35,
// 		// size: {width: 35, height: 35},
// 		acceleration: 120,
// 		state: {
// 			spawning: true,
// 			// death: false,
// 			// invincible: false,
// 		},
// 		timers: {
// 			spawning: 50,
// 		},
// 		direction: Direction.top,
// 		power: Power.Default,
// 		canInitCollision: true,
// 		lives: 1,

// 		checkTimers() {},

// 		update(game) {
// 			const { spawning, death } = this.state;
// 			if (spawning || death) {
// 			}

// 			// this.processInput(game);
// 		},

// 		render(game) {
// 			const { spawning, death, invincible } = this.state;

// 			if (spawning) {
// 				// TODO: Refactor animIndex
// 				const sprites = game.sprites.tankSpawnAnimation;
// 				const index = getAnimIndex(1, this.timers.spawning, sprites.length - 1);
// 				sprites[index](this.x, this.y, this.side);
// 				return;
// 			} else if (death) {
// 				const sprites = game.sprites.tankDeathAnimation;
// 				const index = getAnimIndex(1, this.timers.death, sprites.length - 1);
// 				sprites[index](this.x, this.y, this.side);
// 				return;
// 			}

// 			if (invincible) {
// 				const invincibleSprites = game.sprites.invincible;
// 				const index = Math.floor(game.elapsedTime / 0.1) % invincibleSprites.length;
// 				invincibleSprites[index](this.x, this.y, this.side);
// 			}

// 			let distance;
// 			const sprites = game.sprites[`${this.type}${this.power}`][this.direction];
// 			if (this.direction === Direction.left || this.direction === Direction.right) {
// 				distance = this.position.x;
// 			} else {
// 				distance = this.position.y;
// 			}
// 			const index = Math.floor(distance / 2) % sprites.length;
// 			sprites[index](this.x, this.y, this.side);
// 		},

// 		processInput(game) {
// 			const key = keyboard.getKey();
// 			let isMoving = true;

// 			if (key === Keys.ArrowUp) {
// 				this.direction = Direction.top;
// 			} else if (key === Keys.ArrowDown) {
// 				this.direction = Direction.bottom;
// 			} else if (key === Keys.ArrowLeft) {
// 				this.direction = Direction.left;
// 			} else if (key === Keys.ArrowRight) {
// 				this.direction = Direction.right;
// 			} else {
// 				isMoving = false;
// 			}

// 			if (key === Keys.Space) {
// 				this.shot(game);
// 			}

// 			if (isMoving) {
// 				move.call(this, velocityScale[this.state.power], game.deltaTime);
// 			}
// 		},

// 		resolveEdgeCollision() {
// 			goBack.call(this);
// 		},

// 		resolveTileCollision() {
// 			goBack.call(this);
// 		},

// 		resolveEntityCollision(other, game) {
// 			if (other.type === 'powerup') {
// 				return;
// 			} else if (getStateRemainingTime('death', other, game) >= 0) {
// 				return;
// 			}

// 			if (other.type === 'bullet') {
// 				if (getStateRemainingTime('invincible', this, game) >= 0) return;

// 				this.state.death = game.elapsedTime;
// 				this.lives -= 1;
// 				if (this.lives === 0) {
// 					entityManager.toRemove(this.id);
// 				}
// 			} else {
// 				this.goBack();
// 			}
// 		},

// 		respawn(game) {
// 			this.state.spawn = game.elapsedTime;
// 			this.state.invincible = game.elapsedTime;
// 			this.power = Power.Default;
// 			this.x = PLAYER_SPAWN_POSITION.x;
// 			this.y = PLAYER_SPAWN_POSITION.y;
// 		},
// 	};

// 	powerupEvents.subscribe(entity.id, powerupObserver.bind(entity, game));
// 	return entity;
// }
