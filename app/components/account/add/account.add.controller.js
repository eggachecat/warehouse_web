app.controller('AccountAddCtrl',function($scope, toastService, AuthService, AccountService){
	$scope.privilegeMap = AccountService.privilegeMap;
	$scope.psdLegel = function(psd){
		if(angular.isUndefined(psd) || psd == null || psd == "")
			return false;
		return true;
	}

	$scope.signIn = function(user){
		AuthService.register(user).then(function(){
			toastService.showSimpleToast("註冊成功", "success")
		}, function(err){
			toastService.showSimpleToast(err, "error")
		})
	}
})