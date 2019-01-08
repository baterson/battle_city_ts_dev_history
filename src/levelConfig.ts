import { TankTypes } from './entities/Enemy';

const maps = [
	[
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 3, 0, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 1, 2, 0, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 3, 0, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 1, 2, 0, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 3, 4, 0, 0, 0, 3, 4, 3, 4, 3, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],
];

const tanks = [[1, 2, 0], [2, 0, 1, 0]];
// const tanks = [[2, 2, 0, 0, 1, 1, 0, 0, 0], [1, 1, 0, 0, 2, 2, 0, 1, 0]];

export { maps, tanks };
