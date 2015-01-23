var Controller = USE('Silex.FrameworkBundle.Controller.Controller');


var DefaultController = function() {
	Controller.apply(this, arguments);
};
DefaultController.prototype = Object.create(Controller.prototype);
DefaultController.prototype.constructor = DefaultController;

DefaultController.prototype.homepageAction = function(end, variables) {
	this.render('SitexwSiteBundle::homepage.html.twig');
	end();
};
DefaultController.prototype.nameAction = function(end, variables) {
	this.render('SitexwSiteBundle:Name:name.html.twig', variables);
	end();
};


module.exports = DefaultController;
