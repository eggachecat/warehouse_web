app.controller('ProductUpdateCtrl', ['$scope', 'toastService', 'ProductService', '$state', 
	function($scope, toastService, ProductService, $state){

		$scope.productInfo = {};
		//$scope.productInfo = {};
		$scope.editable = false;

		$scope.watchKey = function(e){
			if(e.keyCode == 9 || e.keyCode == 13){ // tab keyCode
				ProductService.read_product($scope.productInfo)
				.then(function(res){
					$scope.productInfo = res.data[0];
					$scope.productInfo.location = $scope.productInfo.itemlocationname  // backend-problem
				})
			}
		}

		$scope.update = function(){
			ProductService.update_product($scope.productInfo)
			.then(function(res){
				console.log(res)
				toastService.showSimpleToast("產品出庫成功", "success")
				$state.reload();
			}, function(err){
				var errMsg = err.message || "產品出庫失敗"
				toastService.showSimpleToast(errMsg, "error")
			});
		}
	}
]);


// ceb0f4bb91c29e43