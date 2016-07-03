app.controller('PartnoAddCtrl', ['$scope', 'CommonService', 'toastService', 'PartnoService',
	function($scope, CommonService, toastService, PartnoService){
		// PartnoService.sayHello();
		
		function init(){
			$scope.order = {} 
			$scope.querying = false;
		}
		init();

		$scope.downloadBarcode = function(filename){ CommonService.callToDownload(filename); }

		$scope.add = function(order){
			$scope.querying = true;
			PartnoService.add(order).then(function(res){
				$scope.querying = false;
				toastService.showSimpleToast("新增料號成功", "success")
				$scope.barcode = res.reservbarcode;
			}, function(err){
				var errMsg = err.message || "料號更新失敗"
				toastService.showSimpleToast(errMsg, "error")
				$scope.querying = false;
			})
		}

		$scope.refresh = function(){ init(); }

	} 
]); 
 