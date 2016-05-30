app.controller('PartnoManageCtrl', ['$scope', 'barcodeService', 'toastService', 'PartnoService', '$state',
	function($scope, barcodeService, toastService, PartnoService, $state){
		// PartnoService.sayHello();
		

		$scope.columnMap = {internalpartno: "內部料號", externalpartno: "外部料號", itemname: "產品名稱", reservbarcode: "料號條碼"};
		$scope.columns = ["reservbarcode", "internalpartno", "externalpartno", "itemname"]
		$scope.activeColumns = ["reservbarcode"]
		$scope.coulumnNum = 1;

		$scope.searchObj = {}

		$scope.results = []

		$scope.search = function(){
			PartnoService.read($scope.searchObj).then(function(res){
				$scope.results = res.data;
				if(res.data.length > 0) {
					toastService.showSimpleToast("獲取資料成功", "success")
				}else{
					toastService.showSimpleToast("查無資料", "error")
				}

			}, function(err){
				toastService.showSimpleToast(err, "error")
			})
		}
		$scope.addColumn = function(){
			$scope.coulumnNum += 1;
		}

		$scope.range = function(n) {
	        return new Array(n);
	    };

		$scope.update = function(product){
			PartnoService.update(product)
			.then(function(res){
				console.log(res)
				toastService.showSimpleToast("料號更新成功", "success")
				$state.reload();
			}, function(err){
				var errMsg = err.message || "料號更新失敗"
				toastService.showSimpleToast(errMsg, "error")
			});
		}

		
		
	} 
]);