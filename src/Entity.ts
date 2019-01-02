import idGen from './utils/idGen';
import entityPool from './entityPool';

enum Directon {
	top,
	bottom,
	right,
	left,
}

class Entity {
	public id;
	public x;
	public y;
	public prevX;
	public prevY;
	protected velocity;
	protected sprites;
	public width;
	public height;
	public direction;

	constructor(x, y, width, height, direction, velocity, sprites) {
		this.id = idGen();
		this.x = x;
		this.y = y;
		this.prevX = x;
		this.prevY = y;
		this.velocity = velocity;
		this.sprites = sprites;
		this.width = width;
		this.height = height;
		this.direction = direction;
	}

	render = () => {
		const frame = this.resolveFrame();
		frame.draw(this.x, this.y, this.width, this.height);
	};

	move = deltaTime => {
		if (this.direction === Directon.top) {
			this.y -= this.velocity * deltaTime;
		} else if (this.direction === Directon.bottom) {
			this.y += this.velocity * deltaTime;
		} else if (this.direction === Directon.left) {
			this.x -= this.velocity * deltaTime;
		} else if (this.direction === Directon.right) {
			this.x += this.velocity * deltaTime;
		}
	};

	resolveFrame = () => {
		const sprites = this.sprites[this.direction];
		let distance;
		if (this.direction === Directon.left || this.direction === Directon.right) {
			distance = this.x;
		} else {
			distance = this.y;
		}
		const index = Math.floor(distance / 2) % sprites.length;
		return sprites[index];
	};

	destroy = () => {
		entityPool.remove(this.id);
	};

	get outOfScreen() {
		return this.x > 595 || this.x < 0 || this.y > 595 || this.y < 0;
	}
}

export { Directon };
export default Entity;
