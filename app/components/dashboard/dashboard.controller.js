

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