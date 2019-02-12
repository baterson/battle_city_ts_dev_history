// import {
// 	ENEMY_TANK_VELOCITY,
// 	ENEMY_TANK_LIVES,
// 	TANK_SIDE,
// 	FREEZE_DELAY,
// 	move,
// 	goBack,
// 	setRandomDirection,
// 	setOpositeDirection,
// 	getCollisionPoints,
// 	isOutOfScreen,
// 	shot,
// 	Direction,
// 	getStateRemainingTime,
// 	Powerups,
// 	TankTypes,
// } from './common';
// import entityManager from '../entityManager';
// import { powerupEvents } from './powerup';

// const velocityScale = {
// 	[TankTypes.default]: 1,
// 	[TankTypes.fast]: 2,
// 	[TankTypes.armored]: 1.2,
// };

// function powerupObserver(game, powerupType) {
// 	if (powerupType === Powerups.stopwatch) {
// 		this.state.freeze = game.elapsedTime;
// 	} else if (powerupType === Powerups.grenade) {
// 		this.state.death = game.elapsedTime;
// 		entityManager.toRemove(this.id);
// 	}
// }

// export function enemy(id, game, x, y, direction, enemyType) {
// 	const entity = {
// 		type: 'enemy',
// 		id,
// 		direction,
// 		x,
// 		y,
// 		velocity: ENEMY_TANK_VELOCITY[enemyType],
// 		side: TANK_SIDE,
// 		state: {
// 			spawn: game.elapsedTime,
// 		},
// 		canInitCollision: true,
// 		prevTile: { x: 0, y: 0 },
// 		lives: ENEMY_TANK_LIVES[enemyType],

// 		goBack,
// 		setRandomDirection,
// 		setOpositeDirection,
// 		getCollisionPoints,
// 		isOutOfScreen,
// 		shot,

// 		update(game) {
// 			const spawnLeft = getStateRemainingTime('spawn', this, game);
// 			const deathLeft = getStateRemainingTime('death', this, game);

// 			if (deathLeft > 0 || spawnLeft > 0) {
// 				return;
// 			} else {
// 				this.move(game);
// 			}
// 			// else if (this.freezeTick && this.freezeTick + FREEZE_DELAY > game.ticks) {
// 			//     return;
// 			// }
// 		},

// 		render(game) {
// 			const spawnLeft = getStateRemainingTime('spawn', this, game);
// 			const deathLeft = getStateRemainingTime('death', this, game);
// 			const getAnimIndex = (length, left, spritesLength) => {
// 				const step = length / spritesLength;
// 				return Math.floor(left / step);
// 			};

// 			if (spawnLeft >= 0) {
// 				const sprites = game.sprites.tankSpawnAnimation;
// 				const index = getAnimIndex(1, spawnLeft, sprites.length - 1);
// 				const frame = sprites[index];
// 				frame.sprite(this.x, this.y, this.side);
// 				return;
// 			} else if (deathLeft >= 0) {
// 				const index = Math.floor(spawnLeft);
// 				const frame = game.sprites.tankSpawnAnimation[index];
// 				frame.sprite(this.x, this.y, this.side);
// 				return;
// 			}

// 			let distance;
// 			const sprites = game.sprites[`${enemyType}${this.lives}`][this.direction];
// 			if (this.direction === Direction.left || this.direction === Direction.right) {
// 				distance = this.x;
// 			} else {
// 				distance = this.y;
// 			}
// 			const index = Math.floor(distance / 2) % sprites.length;
// 			sprites[index](this.x, this.y, this.side);
// 			// else if (this.freezeTick && this.freezeTick + FREEZE_DELAY > game.ticks) {
// 			//     this.sprites[this.direction][0](this.x, this.y, this.side);
// 		},

// 		move(game) {
// 			if (
// 				Math.abs(Math.floor(this.prevTile.x - this.x)) > 120 ||
// 				Math.abs(Math.floor(this.prevTile.y - this.y)) > 120
// 			) {
// 				this.prevTile = { x: this.x, y: this.y };
// 				// this.shot(ticks);
// 				// this.setRandomDirection();
// 			} else {
// 				move.call(this, 1, game);
// 			}
// 		},

// 		resolveEdgeCollision() {
// 			this.goBack();
// 			this.setRandomDirection();
// 		},

// 		resolveTileCollision(tiles, game) {
// 			this.goBack();
// 			// if (!this.canShoot) { TODO: canshoot
// 			this.setOpositeDirection();
// 			// } else {
// 			// this.shot(game.ticks);
// 			// }
// 		},

// 		resolveEntityCollision(other, game, initiator) {
// 			if (other.type === 'bullet' && other.shooter.type === 'player') {
// 				if (this.lives === 1) {
// 					this.state.death = game.elapsedTime;
// 					entityManager.toRemove(this.id);
// 				} else {
// 					this.lives -= 1;
// 				}
// 			} else if (other.type === 'enemy' && initiator.id === this.id) {
// 				this.goBack();
// 				this.setOpositeDirection();
// 			} else if (other.type === 'player') {
// 				this.goBack();
// 				// this.shot(game.ticks);
// 			}
// 		},
// 	};

// 	powerupEvents.subscribe(entity.id, powerupObserver.bind(entity, game));
// 	return entity;
// }