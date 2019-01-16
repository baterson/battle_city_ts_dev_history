export default function createFlag(sprite, deathSprite) {
	return function flag(id) {
		return {
			type: 'flag',
			id,
			x: 280,
			y: 560,
			side: 40,
			sprite,
			render() {
				this.sprite(this.x, this.y, this.side);
			},
			resolveEntityCollision(other, game) {
				if (other.type === 'bullet') {
					this.sprite = deathSprite;
					game.gameOver();
				}
			},
		};
	};
}
