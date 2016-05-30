app.controller('ProductOutCtrl', ['$scope', 'toastService', 'ProductService', '$state', function($scope, toastService, ProductService, $state){

	function init(){
		$scope.exportProduct = {};
		$scope.productInfo = {};
	}
	init();	

	$scope.watchKey = function(e){
		if(e.keyCode == 9 || e.keyCode == 13){ // tab keyCode
			ProductService.read_product($scope.exportProduct)
			.then(function(res){
				$scope.productInfo = res.data[0];
			})
		}
	}

	$scope.export = function(){
		ProductService.export($scope.exportProduct)
		.then(function(res){
			console.log(res)
			toastService.showSimpleToast("產品出庫成功", "success")
			init();
		}, function(err){
			var errMsg = err.message || "產品出庫失敗"
			toastService.showSimpleToast(errMsg, "error")
		});
	}


}]);


