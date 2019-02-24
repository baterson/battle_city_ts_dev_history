// REMOVE timerNames, DEFAUTL

type timerNames =
	| 'death'
	| 'spawn'
	| 'shotCD'
	| 'freeze'
	| 'invincible'
	| 'stageStarting'
	| 'gameOver'
	| 'enemySpawnCD';

const DEFAULT_FRAME_LENGTH = {
	death: 50,
	spawn: 40,
	shotCD: 30,
	freeze: 50,
	invincible: 50,
	stageStarting: 100,
	gameOver: 100,
	enemySpawnCD: 100,
};

class TimeManager {
	// TODO: Parametrize it
	public timers = {};

	setTimer(timerName, frameLength) {
		this.timers[timerName] = frameLength;
	}

	getTimer(timerName) {
		return this.timers[timerName];
	}

	decrementTimers() {
		const toRemove = Object.entries(this.timers).filter(entry => entry[1] === 0);
		if (toRemove.length) {
			toRemove.forEach(entry => {
				delete this.timers[entry[0]];
			});
		}

		Object.keys(this.timers).forEach(key => {
			this.timers[key] -= 1;
		});
	}
}

export { TimeManager, timerNames, DEFAULT_FRAME_LENGTH };
