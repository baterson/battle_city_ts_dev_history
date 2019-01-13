import screen from './screens/mainScreen';
import image from './screens/image';

class Sprite {
	private dx;
	private dy;
	private dWidth;
	private dHeight;
	private context;

	constructor(dx, dy, dWidth, dHeight, context = screen.context) {
		this.dx = dx;
		this.dy = dy;
		this.dWidth = dWidth;
		this.dHeight = dHeight;
		this.context = context;
	}

	draw(x, y, side) {
		this.context.drawImage(image.image, this.dx, this.dy, this.dWidth, this.dHeight, x, y, side, side);
	}
}

export default Sprite;
