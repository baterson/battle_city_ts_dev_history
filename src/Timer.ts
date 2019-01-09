class Timer {
	public timers;

	constructor() {
		this.timers = {};
	}

	setTimer(tick, cb) {
		if (this.timers[tick]) {
			this.timers[tick].push(cb);
		} else {
			this.timers[tick] = [cb];
		}
	}

	checkTimers(tick) {
		const cbs = this.timers[tick];
		if (cbs) {
			cbs.forEach(cb => cb());
		}
	}
}

export default Timer;
