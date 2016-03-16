app.controller('OrderCtrl', ['$scope', 'barcodeService', function($scope, barcodeService){
	$scope.order = {
		editorId: 007,
		companyId: 234,
		customerId: 123,
		remark:"hehe",
		// barcode: "2333"
	}
	$scope.generateBarcode = function(){
		$scope.order.barcode = barcodeService.generate();
	}
}])