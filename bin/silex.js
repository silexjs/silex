var pa = require('path');
var fs = require('fs');
var ncp = require('ncp').ncp;
var exec = require('child_process').exec;

var argv = process.argv;
if(argv[0] === 'silex') {
	argv = argv.slice(1);
} else {
	argv = argv.slice(2);
}
argv = require('minimist')(argv);

var commands = {
	create: function(cb) {
		var projectName = argv._[1];
		var dir = pa.resolve();
		if(argv._[2] !== undefined) {
			dir = pa.resolve(dir, argv._[2]);
		}
		console.log('Transfers files... (in: '+dir+')');
		ncp(pa.join(__dirname, '../project'), dir, {
			filter: function(fileName) {
				return (pa.basename(fileName)!=='.npmignore');
			},
		}, function(e) {
			if(e) { throw e; }
			var packagePath = pa.join(dir, './package.json');
			var packageFile = ''+fs.readFileSync(packagePath);
			fs.writeFileSync(packagePath, packageFile.replace('%project_name%', projectName));
			argv._[1] = argv._[2];
			commands.install(function() {
				console.log('Project "'+projectName+'" created!');
				(cb||function(){})();
			});
		});
	},
	install: function(cb) {
		var dir = pa.resolve();
		if(argv._[1] !== undefined) {
			dir = pa.resolve(dir, argv._[1]);
		}
		console.log('Install dependencies...');
		exec('cd '+dir+' && npm install', function(e, stdout, stderr) {
			if(stdout != '') {
				console.log('-------------------------------------------------------------------------------');
				console.log(stdout);
				console.log('-------------------------------------------------------------------------------');
			}
			console.log('Install namepace... (Spaceload)');
			exec('spaceload install '+dir, function(e, stdout, stderr) {
				if(stdout != '') { console.log(stdout); }
				(cb||function(){})();
			});
		});
	},
	
	default: function() {
		console.log('------------------------');
		console.log('|   SilexJS commands   |');
		console.log('------------------------');
		console.log('');
		console.log('Commands :');
		console.log('> create {PROJECT-NAME} [{PATH}]    Create the basic files to a new project');
		console.log('> install [{PATH}]          Installs a project (execute basic commands)');
	},
};

console.log('');
if(argv._[0] !== undefined && commands[argv._[0]] !== undefined) {
	commands[argv._[0]]();
} else {
	commands.default();
}
