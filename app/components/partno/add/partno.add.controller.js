app.controller('PartnoAddCtrl', ['$scope', 'barcodeService', 'toastService', 'PartnoService',
	function($scope, barcodeService, toastService, PartnoService){
		// PartnoService.sayHello();
		$scope.order = {} 

		$scope.add = function(order){
			PartnoService.add(order).then(function(res){
				toastService.showSimpleToast("新增料號成功", "success")
				$scope.barcode = res.reservbarcode;
			}, function(err){
				toastService.showSimpleToast(err, "error")
			})
		}

	} 
]);
