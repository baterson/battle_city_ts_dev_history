type timerNames =
	| 'death'
	| 'spawn'
	| 'shotCD'
	| 'freeze'
	| 'invincible'
	| 'stageStarting'
	| 'gameOver'
	| 'enemySpawnCD';

const frameTime = {
	death: 50,
	spawn: 40,
	shotCD: 30,
	freeze: 50,
	invincible: 50,
	stageStarting: 100,
	gameOver: 100,
	enemySpawnCD: 100,
};

class TimerManager {
	public timers = {};

	setTimer(timerName, frameLength?) {
		let length = frameLength ? frameLength : frameTime[timerName];
		this.timers[timerName] = length;
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

export { TimerManager, timerNames, frameTime };
