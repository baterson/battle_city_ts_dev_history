export enum Direction {
	top,
	bottom,
	right,
	left,
}

export default function createEnemy(sprites) {
	return function flag(x, y, direction) {
		return {
			type: 'enemy',
			direction,
			x,
			y,
			sprites,
			velocity: 40,
			side: 40,
			prevTile: { x: 0, y: 0 },
			lives: 1,

			setRandomDirection() {
				const items = [Direction.top, Direction.right, Direction.bottom, Direction.left].filter(
					direction => direction !== this.direction
				);
				const index = Math.floor(Math.random() * items.length);
				this.direction = items[index];
			},

			setOpositeDirection() {
				if (this.direction === Direction.top) {
					this.direction = Direction.bottom;
				} else if (this.direction === Direction.bottom) {
					this.direction = Direction.top;
				} else if (this.direction === Direction.right) {
					this.direction = Direction.left;
				} else {
					this.direction = Direction.right;
				}
			},

			move(deltaTime) {
				if (
					Math.abs(Math.floor(this.prevTile.x - this.x)) > 120 ||
					Math.abs(Math.floor(this.prevTile.y - this.y)) > 120
				) {
					this.prevTile = { x: this.x, y: this.y };
					this.shot();
					this.setRandomDirection();
				} else {
					super.move(deltaTime);
				}
			},

			resolveEdgeCollision() {
				super.resolveEdgeCollision();
				this.setRandomDirection();
			},

			// TODO: Tile types
			resolveTileCollision(tiles, level) {
				this.goBack();
				if (!this.canShoot) {
					this.setOpositeDirection();
				} else {
					this.shot();
				}
			},

			resolveEntityCollision(other, level, initiator) {
				if (other.type === 'bullet' && other.shooter.type === 'player') {
					if (this.lives === 1) {
						this.destroy();
					} else {
						this.lives -= 1;
						// this.sprites = TANK_SPRITES[`${this.type}${this.lives}`];
					}
				} else if (other.type === 'enemy' && initiator.id === this.id) {
					this.goBack();
					this.setOpositeDirection();
				} else if (other.type === 'player') {
					this.goBack();
					this.shot();
				}
			},

			render() {
				const frame = this.resolveFrame();
				frame.draw(this.x, this.y, this.side);
			},

			_move(deltaTime) {
				this.prevY = this.y;
				this.prevX = this.x;

				if (this.direction === Direction.top) {
					this.y -= this.velocity * deltaTime;
				} else if (this.direction === Direction.bottom) {
					this.y += this.velocity * deltaTime;
				} else if (this.direction === Direction.left) {
					this.x -= this.velocity * deltaTime;
				} else if (this.direction === Direction.right) {
					this.x += this.velocity * deltaTime;
				}
			},

			goBack() {
				this.x = this.prevX;
				this.y = this.prevY;
			},

			resolveFrame() {
				const sprites = this.sprites[this.direction];
				let distance;
				if (this.direction === Direction.left || this.direction === Direction.right) {
					distance = this.x;
				} else {
					distance = this.y;
				}
				const index = Math.floor(distance / 2) % sprites.length;
				return sprites[index];
			},

			destroy() {
				this.isDeath = true;
				// entityPool.toRemove(this.id);
			},

			getCollisionPoints() {
				if (this.direction === Direction.top) {
					return [
						{ x: this.x, y: this.y },
						{ x: this.x + this.side / 2, y: this.y },
						{ x: this.x + this.side, y: this.y },
					];
				} else if (this.direction === Direction.right) {
					return [
						{ x: this.x + this.side, y: this.y },
						{ x: this.x + this.side, y: this.y + this.side / 2 },
						{ x: this.x + this.side, y: this.y + this.side },
					];
				} else if (this.direction === Direction.bottom) {
					return [
						{ x: this.x, y: this.y + this.side },
						{ x: this.x + this.side / 2, y: this.y + this.side },
						{ x: this.x + this.side, y: this.y + this.side },
					];
				} else if (this.direction === Direction.left) {
					return [
						{ x: this.x, y: this.y },
						{ x: this.x, y: this.y + this.side / 2 },
						{ x: this.x, y: this.y + this.side },
					];
				}
			},

			get outOfScreen() {
				const [point] = this.getCollisionPoints();
				return point.x > 595 || point.x < 0 || point.y > 595 || point.y < 0;
			},
		};
	};
}
