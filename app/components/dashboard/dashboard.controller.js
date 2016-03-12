app.service('toastService', ['$mdToast', function($mdToast){
	this.showSimpleToast = function(content, delay, position) {
		console.log("heheheheh")
		var _position = position || "top right";
		var _delay = _delay || 3000;
	  	$mdToast.show(
		  	$mdToast.simple()
		  	.textContent(content)
		  	.position(_position)
	    	.hideDelay(_delay)
	  	);
	};
}])

app.controller('DashboardCtrl', ['$scope', '$mdToast',
	function($scope, $mdToast){
		$scope.showSimpleToast = function() {
		  $mdToast.show(
		  	$mdToast.simple()
		  	.textContent('Hello!')
		  	.position("top right")
        	.hideDelay(3000)
		  );
		};
	}
]);