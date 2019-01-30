// TODO: x,y to constants
export function flag(id) {
	return {
		type: 'flag',
		id,
		x: 280,
		y: 560,
		side: 40,
		isDeath: false,

		update() {},
		render(game) {
			// if game.over()
			if (this.isDeath) {
				game.sprites[`${this.type}Death`](this.x, this.y, this.side);
			} else {
				game.sprites[this.type](this.x, this.y, this.side);
			}
		},
		resolveEntityCollision(other, game) {
			if (other.type === 'bullet') {
				game.gameOver();
			}
		},
	};
}
