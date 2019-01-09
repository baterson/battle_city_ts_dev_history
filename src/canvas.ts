const main: any = document.getElementById('root');
const dashboard: any = document.getElementById('dashboard');
const mainContext = main.getContext('2d');
const dashboardContext = dashboard.getContext('2d');

export { main };
export default {
	image: null, // will be loaded in the main.ts
	mainContext,
	dashboardContext,
	main,
	dashboard,
};
