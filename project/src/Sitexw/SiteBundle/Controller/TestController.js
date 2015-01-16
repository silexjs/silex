var Controller = USE('Silex.FrameworkBundle.Controller.Controller');


var TestController = function() {
	Controller.apply(this, arguments);
};
TestController.prototype = Object.create(Controller.prototype);
TestController.prototype.constructor = TestController;

TestController.prototype.helloAction = function(end, variables) {
	this.render('::base.html.twig', variables);
	end();
};


module.exports = TestController;
