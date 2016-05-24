app.controller('ProductsBarcodeCtrl', ['$scope', 'barcodeService', 'toastService', function($scope, barcodeService, toastService){
	$scope.products = {
			editorId: 007,
			companyId: 234,
			customerId: 123,
			remark:"hehe",
			id: 23333,
			amount: 10,
			perid: 0607,
			location: "4A"
	}

	$scope.generateBarcode = function(){
		$scope.products.barcode = barcodeService.generate();
		toastService.showSimpleToast("Generate Barcode: " + $scope.products.barcode, 30000);
	
	}
	$scope.printBarcode = function(){
		$scope.toPrint = true;
	}
}]) 