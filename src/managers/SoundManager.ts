export class SoundManager {
	public tracks;

	constructor(audioSrc, runInLoop = []) {
		this.setupTracks(audioSrc, runInLoop);
	}

	setupTracks(audioSrc, runInLoop) {
		this.tracks = Object.keys(audioSrc).reduce((acc, trackName) => {
			acc[trackName] = new Audio(audioSrc[trackName]);
			if (runInLoop.includes(trackName)) {
				acc[trackName].loop = true;
			}
			return acc;
		}, {});
	}

	play(trackName) {
		return Promise.resolve();
		// return this.tracks[trackName].play();
	}

	pause(trackName) {
		return this.tracks[trackName].pause();
	}
}
