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
			console.log(err)
			var errMsg = err.msg || "註冊帳戶失敗" 
			toastService.showSimpleToast(errMsg, "error")
			$scope.querying = false;
		})
	}

	$scope.refresh = function(){
		init();
	}
})