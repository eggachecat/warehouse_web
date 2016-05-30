app.controller('AccountAddCtrl',function($scope, toastService, AuthService, AccountService, $state){
	$scope.privilegeMap = AccountService.privilegeMap;
	$scope.psdLegel = function(psd){ AccountService.psdLegel(psd) };

	function init(){
		$scope.querying = false;
		$scope.user = {}
	}
	init();

	$scope.signIn = function(){
		$scope.querying = true;
		AuthService.register($scope.user).then(function(){
			toastService.showSimpleToast("註冊成功", "success")
			$scope.querying = false;
		}, function(err){
			var errMsg = err.msg || "料號更新失敗"
			toastService.showSimpleToast(errMsg, "error")
			$scope.querying = false;
		})
	}

	$scope.refresh = function(){
		init();
	}
})