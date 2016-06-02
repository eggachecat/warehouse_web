app.controller('ProductUpdateCtrl', ['$scope', 'toastService', 'ProductService', '$state', 
	function($scope, toastService, ProductService, $state){

		
		function init(){
			$scope.productInfo = {};
			$scope.editable = false;
		}
		init();

		function search(){
			ProductService.read_product($scope.productInfo)
				.then(function(res){
					$scope.results = res.data;
					//$scope.productInfo.location = $scope.productInfo.itemlocationname  // backend-problem
				})
		}

		$scope.search = search;

		$scope.update = function(result){
			ProductService.update_product(result)
			.then(function(res){
				console.log(res)
				toastService.showSimpleToast("產品更新成功", "success")
				init();
			}, function(err){
				var errMsg = err.message || "產品更新失敗"
				toastService.showSimpleToast(errMsg, "error")
			});
		}
	}
]);


// ceb0f4bb91c29e43