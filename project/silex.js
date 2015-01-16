/*
//   _____ _ _               _  _____ 
//  / ____(_) |             | |/ ____|
// | (___  _| | _____  __   | | (___  
//  \___ \| | |/ _ \ \/ /   | |\___ \ 
//  ____) | | |  __/>  < |__| |____) |
// |_____/|_|_|\___/_/\_\____/|_____/  v0.0.3
*/

module.exports = function(config) {
	if(config.splashScreen === true) {
		console.log('   _____ _ _               _  _____ \n  / ____(_) |             | |/ ____|\n | (___  _| | _____  __   | | (___  \n  \\___ \\| | |/ _ \\ \\/ /   | |\\___ \\ \n  ____) | | |  __/>  < |__| |____) |\n |_____/|_|_|\\___/_/\\_\\____/|_____/  v0.0.3\n');
	}

	// The default configuration of the environment and debugging
	var env = 'production';
	var debug = false;

	// Checking launch options
	if(process.argv[2] !== undefined && (process.argv[2] == '-e' || process.argv[2] == '--env')) {
		env = process.argv[3];
	} else if(process.env.NODE_ENV !== undefined) {
		env = process.env.NODE_ENV;
	}
	env = env.toLowerCase();
	if(env === 'development') {
		debug = true;
	}

	// Init Spaceload (for namespace)
	require('spaceload')(debug);
	SPACELOAD.registerFile('./autoload.json');
	SPACELOAD.register('', './src/');

	// Launch Silex Kernel
	var kernel = new (require('./app/AppKernel.js'))(env, debug, __dirname);
	kernel[config.kernelMethod]();
};
