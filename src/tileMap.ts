import Sprite from './Sprite';

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

const TileSprites = {
	[Tiles.brick1]: new Sprite(256, 0, 8, 7),
	[Tiles.brick2]: new Sprite(264, 0, 8, 7),
	[Tiles.brick3]: new Sprite(256, 8, 8, 7),
	[Tiles.brick4]: new Sprite(264, 8, 8, 7),
	[Tiles.ice]: new Sprite(288, 32, 16, 15),
	[Tiles.grass]: new Sprite(272, 32, 16, 15),
};

const bricks = [Tiles.brick1, Tiles.brick2, Tiles.brick3, Tiles.brick4];
const rigid = [...bricks];

const layesrMap = {
	[Layers.under]: [Tiles.ice],
	[Layers.main]: bricks,
	[Layers.over]: [Tiles.grass],
};

class TileMap {
	public tiles;

	constructor(tiles) {
		this.tiles = tiles;
	}

	destroy = ({ x, y }) => {
		const xIndex = Math.max(0, Math.floor(x / TILE_SIDE));
		const yIndex = Math.max(0, Math.floor(y / TILE_SIDE));
		this.tiles[yIndex][xIndex] = Tiles.none;
	};

	lookup = ({ x, y }) => {
		const xIndex = Math.max(0, Math.floor(x / TILE_SIDE));
		const yIndex = Math.max(0, Math.floor(y / TILE_SIDE));
		return { type: this.tiles[yIndex][xIndex], x: xIndex * TILE_SIDE, y: yIndex * TILE_SIDE };
	};

	lookupMany(points) {
		return points.map(point => this.lookup(point));
	}

	renderLayer(name) {
		this.tiles.forEach((row, y) => {
			row.forEach((tile, x) => {
				if (!layesrMap[name].includes(tile)) return;

				TileSprites[tile].draw(x * TILE_SIDE, y * TILE_SIDE, TILE_SIDE, TILE_SIDE);
			});
		});
	}
}

export { bricks, rigid, Tiles, Layers };
export default TileMap;
