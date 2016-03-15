app.controller('EnterCtrl', ['$scope', 'toastService',function($scope, toastService){

	var user = {
		id: "23333"
	};
	
	$scope.goods = {}
	$scope.goods.editorId = user.id;

	$scope.generateBarcode = function(){
		$scope.goods.barcode = 123123121;
		toastService.showSimpleToast("Generate Barcode" + $scope.goods.barcode, 30000);
	}

	$scope.onSubmit = function(){
		toastService.showSimpleToast("Generate Hash Code", 30000);
	}
}]);
