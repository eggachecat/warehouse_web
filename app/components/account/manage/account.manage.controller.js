app.controller('AccountManageCtrl', function($scope, AuthService, DataService, AccountService){
	$scope.privilegeMap = AccountService.privilegeMap;
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
})