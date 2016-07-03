app.controller('ProductBarcodeCtrl', function($scope, CommonService, toastService, ProductService){
	$scope.product = {}

	$scope.partno = {};
	$scope.query = {};

	$scope.barcodeObjs = [];
	$scope.barcodeRows = [];

	$scope.download = function(filename){ CommonService.callToDownload(filename); }

	$scope.watchKey = function(e){
		if(e.keyCode == 9 || e.keyCode == 13){ // tab keyCode
			ProductService.read_partno($scope.product)
			.then(function(res){
				$scope.product = res.data[0];
			})
		}
	}  


	$scope.createStorage = function(){
		ProductService.create_storage($scope.product)
		.then(function(res){
			console.log(res)
			toastService.showSimpleToast("產品新增成功", "success")
			$scope.barcodeObjs = res.data;
		}, function(err){
			console.log(err)
			toastService.showSimpleToast(err.message, "error")
		});
	} 

	// $scope.test_barcodeObjs = [{storagebarcode: "adsfjksdhfudrgurut", itemname: "111",  internalpartno: "11", externalpartno: "1"},
	// {storagebarcode: "2222222222", itemname: "222",  internalpartno: "22", externalpartno: "2"}];
	
	


}) 