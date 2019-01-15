export const createSprite = (image, context) => (dx, dy, dWidth, dHeight) => (x, y, side) => {
	context.drawImage(image, dx, dy, dWidth, dHeight, x, y, side, side);
};
