// TODO: types
function checkEntityCollision(entity1, entity2) {
	const box1 = entity1.getBoundingBox();
	const box2 = entity2.getBoundingBox();
	return box1.x1 < box2.x2 && box1.x2 > box2.x1 && box1.y1 < box2.y2 && box1.y2 > box2.y1;
}

export { checkEntityCollision };
