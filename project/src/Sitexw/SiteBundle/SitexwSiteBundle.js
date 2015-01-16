var Bundle = USE('Silex.Component.Kernel.Bundle');


var SitexwSiteBundle = function() {
	Bundle.call(this);
};
SitexwSiteBundle.prototype = Object.create(Bundle.prototype);
SitexwSiteBundle.prototype.constructor = SitexwSiteBundle;


module.exports = SitexwSiteBundle;
