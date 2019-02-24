class AssetsHolder {
	public image;
	public audio;

	loadSprite(src) {
		return new Promise((resolve, reject) => {
			const image: any = new Image();
			image.addEventListener('load', () => {
				this.image = image;
				resolve();
			});
			image.src = src;
		});
	}

	loadAudio(audio) {
		this.audio = audio;
	}
}

export const assetsHolder = new AssetsHolder();
