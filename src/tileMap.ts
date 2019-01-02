import createTileSprites, { Tiles, layesrMap } from './utils/createTileSprites';

class TileMap {
	public tiles;
	private sprites;

	constructor(tiles, tileSprites) {
		this.tiles = tiles;
		this.sprites = tileSprites;
	}

	destroy = (x, y) => {
		const xIndex = Math.max(0, Math.floor(x / 40));
		const yIndex = Math.max(0, Math.floor(y / 40));
		this.tiles[yIndex][xIndex] = Tiles.none;
	};

	lookup = (x, y) => {
		const xIndex = Math.max(0, Math.floor(x / 40));
		const yIndex = Math.max(0, Math.floor(y / 40));
		// console.log('Y', yIndex, 'X', xIndex, 'Tile: ', this.tiles[yIndex][xIndex], x, y);
		var z = this.tiles[yIndex][xIndex];
		if (z === 1) {
			// console.log('Y', yIndex, 'X', xIndex, x, y);
		}
		return { type: z, x: xIndex * 40, y: yIndex * 40 };
	};

	renderLayer(name) {
		this.tiles.forEach((row, y) => {
			row.forEach((tile, x) => {
				if (!layesrMap[name].includes(tile)) return;

				this.sprites[tile].draw(x * 40, y * 40, 40, 40);
			});
		});
	}
}

const map = [
	[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
	[0, 2, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
	[0, 2, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 1, 0, 0, 0, 2, 0, 0, 1, 1, 1, 0, 0],
	[0, 2, 0, 1, 1, 1, 0, 2, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 2, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
];

export default new TileMap(map, createTileSprites());
