app.controller('FormCtrl', ['$scope', 'toastService',function($scope, toastService){

	var user = {
		id: "23333"
	};
	
	$scope.editor = user.id;
	$scope.good = {}

	$scope.generateBarcode = function(){
		$scope.good.barcode = 123123121;
		toastService.showSimpleToast("Generate Barcode" + $scope.good.barcode, 30000);
	}

	$scope.onSubmit = function(){
		toastService.showSimpleToast("Generate Hash Code", 30000);
	}
}]);
