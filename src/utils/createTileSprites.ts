import Sprite from '../Sprite';

enum Tiles {
	none,
	brick,
	ice,
	grass,
}

enum Layers {
	under,
	main,
	over,
}

const rigid = [Tiles.brick];

const layesrMap = {
	[Layers.under]: [Tiles.ice],
	[Layers.main]: [Tiles.brick],
	[Layers.over]: [Tiles.grass],
};

const createTileSprites = () => {
	return {
		[Tiles.brick]: new Sprite(256, 0, 16, 15),
		[Tiles.ice]: new Sprite(288, 32, 16, 15),
		[Tiles.grass]: new Sprite(272, 32, 16, 15),
	};
};

export { Tiles, Layers, layesrMap, rigid };
export default createTileSprites;
