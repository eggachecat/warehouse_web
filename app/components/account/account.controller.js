app.controller('AccountCtrl', ['$scope', 'AuthService', 'DataService', function($scope, AuthService, DataService){

	// var data = DataService.getUserList();
	$scope.selected = [];
	DataService.getUserList().then(function(data){
		$scope.userList = data.list;
	})

	$scope.onSubmit = function(user){
		AuthService.register(user).then(function(data){
			console.log(data)
		}, function(error){
			console.log(error)
		});
	}
}])