const coin = () => Math.round(Math.random()) === 1;

const randomInt = limit => {
	return Math.floor(Math.random() * limit);
};

export { coin, randomInt };
