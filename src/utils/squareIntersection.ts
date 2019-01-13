export default function squareIntersection(square1, square2) {
	if (
		square1.x < square2.x + square2.side &&
		square1.x + square1.side > square2.x &&
		square1.y < square2.y + square2.side &&
		square1.y + square1.side > square2.y
	) {
		return true;
	}
	return false;
}
