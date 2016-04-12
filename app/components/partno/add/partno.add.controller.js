app.controller('PartnoAddCtrl', ['$scope', 'barcodeService', 'toastService', 'PartnoService',
	function($scope, barcodeService, toastService, PartnoService){
		// PartnoService.sayHello();
		$scope.order = {
			editorId: 007,
			companyId: 234,
			customerId: 123,
			remark:"hehe",
		}
		$scope.toPrint = false;

		$scope.generateBarcode = function(){
			$scope.order.barcode = barcodeService.generate();
			toastService.showSimpleToast("Generate Barcode: " + $scope.order.barcode, 30000);
		
		}

	} 
]);
