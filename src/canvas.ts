const canvas: any = document.getElementById('root');
const context = canvas.getContext('2d');

export { canvas };
export default {
	image: null, // will be loaded in the main.ts
	context,
	canvas,
};
