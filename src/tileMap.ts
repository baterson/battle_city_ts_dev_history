import { Tiles, Layers, RawTiles, Tile } from './types';
import { TILE_SIDE } from './constants';
import { assetsHolder } from './utils';

export const rigid = [Tiles.brick1, Tiles.brick2, Tiles.brick3, Tiles.brick4];

const layesrMap = {
	[Layers.under]: [Tiles.ice],
	[Layers.main]: [Tiles.brick1, Tiles.brick2, Tiles.brick3, Tiles.brick4],
	[Layers.over]: [Tiles.grass],
};

export class TileMap {
	public tiles: RawTiles;

	constructor(tiles: RawTiles) {
		this.tiles = tiles.map(row => [...row]);
	}

	destroy(x: number, y: number): void {
		const xIndex = Math.max(0, Math.floor(x / TILE_SIDE));
		const yIndex = Math.max(0, Math.floor(y / TILE_SIDE));
		this.tiles[yIndex][xIndex] = Tiles.none;
	}

	lookup(x: number, y: number): Tile {
		const xIndex = Math.min(Math.max(0, Math.floor(x / TILE_SIDE)), 29);
		const yIndex = Math.min(Math.max(0, Math.floor(y / TILE_SIDE)), 29);
		return { type: this.tiles[yIndex][xIndex], x: xIndex * TILE_SIDE, y: yIndex * TILE_SIDE };
	}

	lookupRange(point1: [number, number], point2: [number, number]): Tile[] {
		let inBetweenPoint = [];
		const [x1, y1] = point1;
		const [x2, y2] = point2;
		const rangeX = Math.abs(x1 - x2);
		const rangeY = Math.abs(y1 - y2);

		if (rangeX > 0 && rangeX > TILE_SIDE) {
			// Checks tiles in between tank edges
			inBetweenPoint.push([x1 + TILE_SIDE, y1]);
		} else if (rangeY > 0 && rangeY > TILE_SIDE) {
			inBetweenPoint.push([x1, y1 + TILE_SIDE]);
		}

		return [point1, ...inBetweenPoint, point2].map(point => this.lookup(point[0], point[1]));
	}

	renderLayer(name: Layers): void {
		this.tiles.forEach((row, y) => {
			row.forEach((tile, x) => {
				if (!layesrMap[name].includes(tile)) return;
				assetsHolder.sprites.tiles[tile]({ x: x * TILE_SIDE, y: y * TILE_SIDE }, { x: TILE_SIDE, y: TILE_SIDE });
			});
		});
	}
}
