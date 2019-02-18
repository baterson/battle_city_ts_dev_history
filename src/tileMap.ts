import c from './utils/console';

const TILE_SIDE = 20;

enum Tiles {
	none,
	brick1,
	brick2,
	brick3,
	brick4,
	ice,
	grass,
}

enum Layers {
	under,
	main,
	over,
}

const bricks = [Tiles.brick1, Tiles.brick2, Tiles.brick3, Tiles.brick4];
const rigid = [...bricks];

const layesrMap = {
	[Layers.under]: [Tiles.ice],
	[Layers.main]: bricks,
	[Layers.over]: [Tiles.grass],
};

class TileMap {
	public tiles;
	public sprites;

	constructor(tiles, sprites) {
		this.tiles = tiles.map(row => [...row]);
		this.sprites = sprites;
	}

	destroy(x, y) {
		const xIndex = Math.max(0, Math.floor(x / TILE_SIDE));
		const yIndex = Math.max(0, Math.floor(y / TILE_SIDE));
		this.tiles[yIndex][xIndex] = Tiles.none;
	}

	lookup(x, y) {
		const xIndex = Math.min(Math.max(0, Math.floor(x / TILE_SIDE)), 29);
		const yIndex = Math.min(Math.max(0, Math.floor(y / TILE_SIDE)), 29);
		return { type: this.tiles[yIndex][xIndex], x: xIndex * TILE_SIDE, y: yIndex * TILE_SIDE, xIndex, yIndex };
	}

	lookupRange(point1, point2) {
		let inBetweenPoint = [];
		const [x1, y1] = point1;
		const [x2, y2] = point2;
		const rangeX = Math.abs(x1 - x2);
		const rangeY = Math.abs(y1 - y2);

		if (rangeX > 0 && rangeX > TILE_SIDE) {
			// TODO: comment about tank
			inBetweenPoint.push([x1 + TILE_SIDE, y1]);
		} else if (rangeY > 0 && rangeY > TILE_SIDE) {
			inBetweenPoint.push([x1, y1 + TILE_SIDE]);
		}

		return [point1, ...inBetweenPoint, point2].map(point => this.lookup(point[0], point[1]));
	}

	renderLayer(name) {
		this.tiles.forEach((row, y) => {
			row.forEach((tile, x) => {
				if (!layesrMap[name].includes(tile)) return;

				this.sprites[tile]({ x: x * TILE_SIDE, y: y * TILE_SIDE }, { x: TILE_SIDE, y: TILE_SIDE });
			});
		});
	}
}

export { bricks, rigid, Tiles, Layers, TILE_SIDE };
export default TileMap;
