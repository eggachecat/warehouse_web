app.controller('PartnoManageCtrl', ['$scope', 'barcodeService', 'toastService', 'PartnoService', 
	function($scope, barcodeService, toastService, PartnoService){
		// PartnoService.sayHello();
		$scope.selected = [];
		$scope.tags = [];
		$scope.query = {
			limit: 5,
			page: 1
		};

		$scope.columnMap = {internalpartno: "內部料號", externalpartno: "外部料號", itemname: "產品名稱", reservbarcode: "料號條碼"};
		$scope.columns = ["reservbarcode", "internalpartno", "externalpartno", "itemname"]
		$scope.activeColumns = ["reservbarcode"]
		$scope.coulumnNum = 1;

		$scope.searchObj = {}

		$scope.results = []

		$scope.search = function(){
			PartnoService.read($scope.searchObj).then(function(res){
				$scope.results = res.data;
				toastService.showSimpleToast("更新成功", "success")
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

		$scope.desserts = {}

		
		
	} 
]);