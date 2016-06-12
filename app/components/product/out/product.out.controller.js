app.controller('ProductOutCtrl', ['$scope', 'toastService', 'ProductService', '$state', function($scope, toastService, ProductService, $state){

	function init(){
		$scope.exportProduct = {};
		$scope.productInfo = {};
	}
	init();	

	$scope.querying = false;

	$scope.watchKey = function(e){
		if(e.keyCode == 9 || e.keyCode == 13){ // tab keyCode
			$scope.querying = true;
			ProductService.read_product($scope.productInfo)
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

	$scope.export = function(){
		$scope.querying = true;
		ProductService.export($scope.productInfo)
		.then(function(res){
			console.log(res)
			toastService.showSimpleToast("產品出庫成功", "success")
			init();
			$scope.querying = false;
		}, function(err){
			var errMsg = err.message || "產品出庫失敗";
			toastService.showSimpleToast(errMsg, "error");
			$scope.querying = false;
		});
	}


}]);


