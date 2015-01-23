/*
//   _____ _ _               _  _____ 
//  / ____(_) |             | |/ ____|
// | (___  _| | _____  __   | | (___  
//  \___ \| | |/ _ \ \/ /   | |\___ \ 
//  ____) | | |  __/>  < |__| |____) |
// |_____/|_|_|\___/_/\_\____/|_____/  v0.0.x
*/

module.exports = function(config) {
	// The default configuration of the environment and debugging
	var env = 'production';

	// Checking launch options
	if(process.argv[2] !== undefined && (process.argv[2] == '-e' || process.argv[2] == '--env')) {
		env = process.argv[3];
	} else if(process.env.NODE_ENV !== undefined) {
		env = process.env.NODE_ENV;
	}
	env = env.toLowerCase();
	var environments = require('./environments.json');
	if(environments[env] === undefined) {
		throw new Error('the environment "'+env+'" does not exist (list: '+Object.keys(environments).joint(', ')+')');
	}
	var log = environments[env].log;
	
	if(config.splashScreen === true) {
		console.log('   _____ _ _               _  _____ \n  / ____(_) |             | |/ ____|\n | (___  _| | _____  __   | | (___  \n  \\___ \\| | |/ _ \\ \\/ /   | |\\___ \\ \n  ____) | | |  __/>  < |__| |____) |  v0.0.x\n |_____/|_|_|\\___/_/\\_\\____/|_____/   '+env+'\n');
	}

	// Init Spaceload (for namespace)
	require('spaceload')(env==='development'||env==='testing');
	SPACELOAD.registerFile('./autoload.json');
	SPACELOAD.register('', './src/');

	// Launch Silex Kernel
	var kernel = new (require('./app/AppKernel.js'))(env, log, __dirname);
	kernel[config.kernelMethod]();

	return kernel;
};
