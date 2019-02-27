const coin = (): boolean => Math.round(Math.random()) === 1;

const randomInt = (limit: number): number => {
	return Math.floor(Math.random() * limit);
};

export { coin, randomInt };
