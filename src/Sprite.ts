import canvas from './canvas';

class Sprite {
	private dx;
	private dy;
	private dWidth;
	private dHeight;

	constructor(dx, dy, dWidth = 16, dHeight = 15) {
		this.dx = dx;
		this.dy = dy;
		this.dWidth = dWidth;
		this.dHeight = dHeight;
	}

	draw(x, y, side) {
		canvas.context.drawImage(canvas.image, this.dx, this.dy, this.dWidth, this.dHeight, x, y, side, side);
	}
}

export default Sprite;
