var Kernel = USE('Silex.Component.Kernel.Kernel');


var AppKernel = function() {
	Kernel.apply(this, arguments);
};
AppKernel.prototype = Object.create(Kernel.prototype);
AppKernel.prototype.constructor = AppKernel;

AppKernel.prototype.registerBundles = function() {
	var bundles = [
		'Silex.FrameworkBundle.SilexFrameworkBundle',
		'Silex.SequelizeBundle.SilexSequelizeBundle',
		'Silex.HttpServerBundle.SilexHttpServerBundle',
		'Silex.HttpStaticBundle.SilexHttpStaticBundle',
		'Silex.SwigBundle.SilexSwigBundle',
		
		'Sitexw.SiteBundle.SitexwSiteBundle',
	];
	
	if(['development', 'testing'].indexOf(this.env) !== -1) {
		// Other bundles development/testing...
	}
	
	return bundles;
};

AppKernel.prototype.configRegister = function(config) {
	config.load(__dirname+'/config/config_'+this.env+'.json');
};


module.exports = AppKernel;
