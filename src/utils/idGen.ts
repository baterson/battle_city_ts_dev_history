const createIdGen = () => {
	let value = 0;
	return {
		getId() {
			return (value += 1);
		},
		reset() {
			value = 0;
		},
	};
};

export default createIdGen();
