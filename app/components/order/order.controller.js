app.controller('OrderCtrl', ['$scope', 'barcodeService', 'toastService', 'PrintService', 'CanvasService', 
	function($scope, barcodeService, toastService, PrintService, CanvasService){

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
		$scope.printBarcode = function(){
			$scope.toPrint = ! $scope.toPrint;
			//$scope.toPrint = false;
		}
		
	}
]);

app.directive('print', function(PrintService, CanvasService){
	// Runs during compile
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, iElm, iAttrs, controller) {
			console.log(iAttrs.print )
			$scope.$watch(iAttrs.print, function(value){
				CanvasService.getData(iElm).then(function(data){
					PrintService.preview({dataUrl: data})
				})
			})
		}
	};
});

app.service('CanvasService', ['$q', function($q){
	this.getData = function(element) {
		var data = $q.defer();
		html2canvas(element, {
			onrendered: function(canvas) {
    			data.resolve(canvas.toDataURL());
	    	}
		});
		return data.promise
	}
}])

