var Controller = USE('Silex.FrameworkBundle.Controller.Controller');


var DefaultController = function() {
	Controller.apply(this, arguments);
};
DefaultController.prototype = Object.create(Controller.prototype);
DefaultController.prototype.constructor = DefaultController;

DefaultController.prototype.homepageAction = function(variables) {
	this.sendView('SitexwSiteBundle::homepage.html.twig').end();
};
DefaultController.prototype.nameAction = function(variables) {
	this.sendView('SitexwSiteBundle:Name:name.html.twig', variables);
	this.end();
};


module.exports = DefaultController;
