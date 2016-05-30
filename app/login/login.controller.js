app.controller('LoginCtrl', ['$scope', 'barcodeService', 'toastService', 'PartnoService', 'AuthService', '$state', 
	function($scope, barcodeService, toastService, PartnoService, AuthService, $state){
		
		$scope.querying = true;
		$state.go("main.product_barcode"); 
			// if not authed should be prevented
		$scope.querying = false;

		$scope.onSubmit = function(user){
			$scope.querying = true;
			AuthService.login(user).then(function(data){
				$scope.querying = false;
				toastService.showSimpleToast("更新成功", "success");
				$state.go("main.product_barcode");
			}, function(error){
				$scope.querying = false;
				toastService.showSimpleToast(error, "error")
			});
		}
	} 
]);

