app.controller('ProductBarcodeCtrl', function($scope, barcodeService, toastService, ProductService){
	$scope.product = {}

	$scope.partno = {};
	$scope.query = {};


	$scope.watchKey = function(e){
		if(e.keyCode == 9 || e.keyCode == 13){ // tab keyCode
			ProductService.read_partno($scope.product)
			.then(function(res){
				$scope.partno = res.data[0];
			})
		}
	}

	$scope.generateBarcode = function(){
		$scope.products.barcode = barcodeService.generate();
		toastService.showSimpleToast("Generate Barcode: " + $scope.products.barcode, 30000);
	
	}
	$scope.printBarcode = function(){
		$scope.toPrint = true;
	}

	$scope.createStorage = function(){
		ProductService.create_storage($scope.product)
		.then(function(res){
			console.log(res)
			toastService.showSimpleToast("產品新增成功", "success")
			$scope.barcode = res.data[0].storagebarcode;
		}, function(){});
	} 

}) 