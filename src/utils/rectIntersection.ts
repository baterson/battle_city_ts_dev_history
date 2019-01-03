export default function rectIntersection(rect1, rect2) {
	if (
		rect1.x < rect2.x + rect2.side &&
		rect1.x + rect1.side > rect2.x &&
		rect1.y < rect2.y + rect2.side &&
		rect1.y + rect1.side > rect2.y
	) {
		return true;
	}
	return false;
}
