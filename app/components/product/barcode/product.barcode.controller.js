app.controller('ProductBarcodeCtrl', function($scope, barcodeService, toastService, ProductService){
	$scope.product = {}

	$scope.partno = {};
	$scope.query = {};

	$scope.barcodeObjs = [];
	$scope.barcodeRows = [];

	$scope.downloadBarcode = function(filename){ barcodeService.callToDownload(filename); }

	$scope.watchKey = function(e){
		if(e.keyCode == 9 || e.keyCode == 13){ // tab keyCode
			ProductService.read_partno($scope.product)
			.then(function(res){
				$scope.partno = res.data[0];
			})
		}
	}

	function layoutBarcode(){
		$scope.barcodeRows = [];
		while ($scope.barcodeObjs.length) {
		    $scope.barcodeRows.push($scope.barcodeObjs.splice(0, 2))
		}
	}

	$scope.createStorage = function(){
		ProductService.create_storage($scope.product)
		.then(function(res){
			console.log(res)
			toastService.showSimpleToast("產品新增成功", "success")
			$scope.barcodeObjs = res.data;
			layoutBarcode();
		}, function(err){
			console.log(err)
			toastService.showSimpleToast(err.message, "error")
		});
	} 

	// $scope.test_barcodeObjs = ["111111111111", "222222222222", "0000000000000"];
	// $scope.test_barcodeRows = [];
	// function test_layoutBarcode(){
	// 	$scope.test_barcodeRows = [];
	// 	while ($scope.test_barcodeObjs.length) {
	// 	    $scope.test_barcodeRows.push($scope.test_barcodeObjs.splice(0, 2))
	// 	}
	// }
	// test_layoutBarcode();
	


}) 