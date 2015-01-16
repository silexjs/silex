var Kernel = USE('Silex.Component.Kernel.Kernel');


var AppKernel = function() {
	Kernel.apply(this, arguments);
};
AppKernel.prototype = Object.create(Kernel.prototype);
AppKernel.prototype.constructor = AppKernel;

AppKernel.prototype.registerBundles = function() {
	var bundles = [
		'Silex.HttpServerBundle.SilexHttpServerBundle',
		'Silex.FrameworkBundle.SilexFrameworkBundle',
		'Silex.SequelizeBundle.SilexSequelizeBundle',
		'Silex.SilexSwigBundle.SilexSwigBundle',
		
		'Sitexw.SiteBundle.SitexwSiteBundle',
	];
	
	if(['devlopment', 'testing'].indexOf(this.env) !== -1) {
		bundles.push('Sitexw.TestBundle.SitexwTestBundle');
	}
	
	return bundles;
};

AppKernel.prototype.configRegister = function(config) {
	config.load(__dirname+'/config/config_'+this.env+'.json');
};


module.exports = AppKernel;
