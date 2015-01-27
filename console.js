var pa = require('path');
var fs = require('fs');
var ncp = require('ncp').ncp;
var exec = require('child_process').exec;


var Console = function(cmd) {
	this.cmd = cmd;
};
Console.prototype = {
	cmd: null,
	
	registerCmd: function(isSilexProject, cb) {
		var self = this;
		if(isSilexProject === false) {
			this.cmd
				.command('project:create <name> [dir]')
				.option('-f, --force', 'Force the creation of the project if the folder is not empty')
				.description('Create basic files and installs the framework (see project:install)')
				.action(function(projectName, dir, options) {
					self.commandProjectCreate.call(self, projectName, dir, options, cb);
				});
		}
		this.cmd
			.command('project:install [dir]')
			.description('Installs the framework (Dependencies and Nmespace)')
			.action(function(dir, options) {
				self.commandProjectInstall.call(self, dir, options, cb);
			});
	},
	
	commandProjectCreate: function(projectName, dir, options, cb) {
		var self = this;
		var dir = pa.resolve(dir || '');
		var cb = cb || function(){};
		if(fs.existsSync(dir) === false) {
			fs.mkdirSync(dir);
		} else if(options.force !== true && fs.readdirSync(dir).length > 0) {
			console.log('The project folder is not empty, use the "--force" option to force creation');
			cb();
			return;
		}
		this.setLoader('Transfers files% (in: '+dir+')');
		ncp(pa.join(__dirname, './project'), dir, {
			filter: function(fileName) {
				return (pa.basename(fileName)!=='.npmignore');
			},
		}, function(e) {
			self.stopLoader();
			if(e) { throw e; }
			var packagePath = pa.join(dir, './package.json');
			var packageFile = ''+fs.readFileSync(packagePath);
			fs.writeFileSync(packagePath, packageFile.replace('%project_name%', projectName));
			self.commandProjectInstall(dir, options, function() {
				console.log('Project "'+projectName+'" created!');
				cb();
			});
		});
	},
	
	commandProjectInstall: function(dir, options, cb) {
		var self = this;
		var dir = pa.resolve(dir || '');
		var cb = cb || function(){};
		this.setLoader('Install dependencies');
		exec('cd '+dir+' && npm install', function(e, stdout, stderr) {
			self.stopLoader();
			if(stdout != '') {
				console.log('------------------------------------------------------------------------- START');
				console.log(stdout);
				console.log('--------------------------------------------------------------------------- END');
			}
			self.setLoader('Install namepace% (Spaceload)');
			exec('spaceload install '+dir, function(e, stdout, stderr) {
				self.stopLoader();
				if(stdout != '') {
					console.log('------------------------------------------------------------------------- START');
					console.log(stdout);
					console.log('--------------------------------------------------------------------------- END');
				}
				cb();
			});
		});
	},
	
	loaderLabel: null,
	setLoader: function(label) {
		var self = this;
		this.loaderLabel = label;
		var points = '   ';
		var interval = setInterval(function() {
			if(self.loaderLabel !== label) {
				clearInterval(interval);
				return;
			}
			if(points === '   ') { points = '.  '; }
			else if(points === '.  ') { points = '.. '; }
			else if(points === '.. ') { points = '...'; }
			else if(points === '...') { points = '   '; }
			process.stderr.clearLine();
			process.stderr.cursorTo(0);
			if(label.search('%') === -1) {
				var str = label+points;
			} else {
				var str = label.replace('%', points);
			}
			process.stderr.write(str);
		}, 500);
	},
	stopLoader: function() {
		if(this.loaderLabel === null) {
			return;
		}
		process.stderr.clearLine();
		process.stderr.cursorTo(0);
		if(this.loaderLabel.search('%') === -1) {
			var str = this.loaderLabel+'...';
		} else {
			var str = this.loaderLabel.replace('%', '...');
		}
		process.stderr.write(str+"\n");
		this.loaderLabel = null;
	},
};


module.exports = Console;
