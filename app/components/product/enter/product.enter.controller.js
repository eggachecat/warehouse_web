app.controller('ProductEnterCtrl', ['$scope', 'toastService', 'ProductService', '$state', function($scope, toastService, ProductService, $state){

	

	function init(){
		$scope.importProduct = {};
		$scope.productInfo = {}
	}
	init();

	$scope.querying = false;

	$scope.watchKey = function(e){
		if(e.keyCode == 9 || e.keyCode == 13){ // tab keyCode
			$scope.querying = true;
			ProductService.read_product($scope.importProduct)
			.then(function(res){
				if(res.data.length){
					$scope.productInfo = res.data[0];
				}else{
					toastService.showSimpleToast("找不到產品", "error")
				}
				$scope.querying = false;
			})
		}
	}

	$scope.import = function(){
		$scope.querying = true;
		ProductService.import($scope.importProduct)
		.then(function(res){
			console.log(res)
			toastService.showSimpleToast("產品入庫成功", "success")
			$scope.querying = false;
			init();
		}, function(err){
			var errMsg = err.message || "產品入庫失敗"
			toastService.showSimpleToast(errMsg, "error")
			$scope.querying = false;
		});
	}


}]);


// cf97ef228e234499