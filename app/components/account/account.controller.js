app.controller('AccountCtrl', ['$scope', 'AuthService', function($scope, AuthService){
	$scope.onSubmit = function(user){
		AuthService.register(user).then(function(data){
			console.log(data)
		}, function(error){
			console.log(error)
		});
	}
}])