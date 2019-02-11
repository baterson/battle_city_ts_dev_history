// TODO: types
function checkEntityCollision(entity1, entity2) {
	const box1 = entity1.getBoundingBox();
	const box2 = entity2.getBoundingBox();
	return box1.left < box2.right && box1.right > box2.left && box1.top > box2.bottom && box1.bottom < box2.top;
}

export { checkEntityCollision };
