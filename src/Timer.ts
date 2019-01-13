class Timer {
	public timers;
	public ticks;

	constructor() {
		this.timers = {};
		this.ticks = 0;
	}

	set(ticksToWait, cb) {
		const tickToCall = this.ticks + ticksToWait;
		if (this.timers[tickToCall]) {
			this.timers[tickToCall].push(cb);
		} else {
			this.timers[tickToCall] = [cb];
		}
	}

	checkAll() {
		const cbs = this.timers[this.ticks];
		if (cbs) {
			cbs.forEach(cb => cb());
		}
	}

	reset() {
		this.ticks = 0;
	}

	increment() {
		this.ticks += 1;
	}
}

export default new Timer();
