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
		return this.tracks[trackName].play();
	}

	pause(trackName) {
		return this.tracks[trackName].pause();
	}
}

// class AudioManager {
// 	public tracks;
// 	public queue = {};

// 	setupTracks(audioSrc, runInLoop) {
// 		this.tracks = Object.keys(audioSrc).reduce((acc, trackName) => {
// 			acc[trackName] = new Audio(audioSrc[trackName]);

// 			if (runInLoop.includes(trackName)) {
// 				acc[trackName].loop = true;
// 			} else {
// 				this.queue[trackName] = 0;
// 				acc[trackName].onended = this.onendedCb(trackName);
// 			}

// 			return acc;
// 		}, {});
// 	}
// 	onendedCb = trackName => () => {
// 		console.log('this.queue[trackName]', this.queue[trackName]);
// 		if (this.queue[trackName]) {
// 			this.tracks[trackName].play();
// 			this.queue[trackName] -= 1;
// 		}
// 	};

// 	play(trackName) {
// 		const track = this.tracks[trackName];
// 		const notPlayedYet = !track.ended && !track.played.length;
// 		const playing = !track.ended && track.played.length;

// 		if (track.loop) {
// 			return track.play();
// 		} else if (notPlayedYet || !playing) {
// 			console.log('Or here?', notPlayedYet || playing);
// 			return track.play();
// 		} else {
// 			this.queue[trackName] += 1;
// 		}
// 	}

// 	pause(trackName) {
// 		this.tracks[trackName].pause();
// 	}
// }

// export const audioManager = new AudioManager();
