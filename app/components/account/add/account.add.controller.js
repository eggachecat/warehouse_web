app.controller('AccountAddCtrl',function($scope, toastService, AuthService, AccountService){
	$scope.privilegeMap = AccountService.privilegeMap;
	$scope.psdLegel = function(psd){ AccountService.psdLegel(psd) };

	$scope.signIn = function(user){
		AuthService.register(user).then(function(){
			toastService.showSimpleToast("註冊成功", "success")
		}, function(err){
			toastService.showSimpleToast(err, "error")
		})
	}
})