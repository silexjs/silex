var Controller = USE('Silex.FrameworkBundle.Controller.Controller');


var DefaultController = function() {
	Controller.apply(this, arguments);
};
DefaultController.prototype = Object.create(Controller.prototype);
DefaultController.prototype.constructor = DefaultController;

DefaultController.prototype.homepageAction = function(end, variables) {
	console.log(variables);
	end();
};


module.exports = DefaultController;
