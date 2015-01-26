var pa = require('path');
var fs = require('fs');
var commander = require('commander');
var Console = require('../console.js');


var isSilexProject = false;
var packageFile = pa.resolve('package.json');
if(fs.existsSync(packageFile) === true) {
	var packageContent = require(packageFile);
	var frameworks = packageContent.frameworks;
	if(frameworks !== undefined) {
		for(var i in frameworks) {
			var match = frameworks[i].toLowerCase().match(/^silex(js)?(@([0-9]+|x)(\.([0-9]+|x))?(\.([0-9]+|x))?)?$/);
			if(match !== null && [undefined, '0', '1'].indexOf(match[3]) !== -1) {
				isSilexProject = true;
			}
		}
	}
}
var hasNodeModules = fs.existsSync(pa.resolve('node_modules'));


commander._name = 'silex';
var cons = new Console(commander);

cons.registerCmd(isSilexProject, function() {
	process.exit();
});
if(isSilexProject === true && hasNodeModules === true) {
	require(pa.resolve('launcher.js'))({
		splashScreen: false,
		kernelMethod: 'initConsole',
		kernelArguments: [commander],
		log: {
			"show": "info",
			"write": "info"
		},
	});
}

if(process.argv[2] === undefined) {
	var str = '\n  (i) This console is ';
	if(isSilexProject === true) {
		str += 'connected to the Silex project "'+packageContent.name+'"';
	} else {
		str += 'NOT connected to the Silex project';
	}
	console.log(str+'\n'+commander.helpInformation());
	process.exit();
} else {
	commander.parse(process.argv);
}
