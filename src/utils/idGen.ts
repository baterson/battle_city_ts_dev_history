const createIdGen = () => {
	let value = 0;
	return function idGen() {
		return (value += 1);
	};
};

export default createIdGen();
