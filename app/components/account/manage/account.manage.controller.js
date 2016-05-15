app.controller('AccountManageCtrl', function($scope, AuthService, AccountService, toastService){
	$scope.privilegeMap = AccountService.privilegeMap;
	// var data = DataService.getUserList();
	$scope.selected = [];

	$scope.dirtyRow = undefined;
	AccountService.read().then(function(data){
		$scope.userList = data.list;
	})
 
	$scope.onSubmit = function(user){
		AuthService.register(user).then(function(data){
			console.log(data)
		}, function(error){
			console.log(error)
		});
	}


	$scope.edit = function(data){
		$scope.dirtyRow = data;	
	}

	$scope.save = function(){
		var tmpUser = $scope.dirtyRow;
		AccountService.update(tmpUser).then(function(){
			toastService.showSimpleToast("更新成功", "success")
		}, function(err){
			toastService.showSimpleToast(err, "error")
		})
	}
})
