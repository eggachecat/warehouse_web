app.controller('ProductEnterCtrl', ['$scope', 'toastService', 'ProductService', '$state', function($scope, toastService, ProductService, $state){

	$scope.importProduct = {};
	$scope.productInfo = {}

	$scope.watchKey = function(e){
		if(e.keyCode == 9 || e.keyCode == 13){ // tab keyCode
			ProductService.read_product($scope.importProduct)
			.then(function(res){
				$scope.productInfo = res.data[0];
			})
		}
	}

	$scope.import = function(){
		ProductService.import($scope.importProduct)
		.then(function(res){
			console.log(res)
			toastService.showSimpleToast("產品入庫成功", "success")
			$state.reload();
		}, function(err){
			var errMsg = err.message || "產品入庫失敗"
			toastService.showSimpleToast(errMsg, "error")
		});
	}


}]);


// cf97ef228e234499