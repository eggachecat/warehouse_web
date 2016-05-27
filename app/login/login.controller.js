app.controller('LoginCtrl', ['$scope', 'barcodeService', 'toastService', 'PartnoService', 'AuthService', '$state', 
	function($scope, barcodeService, toastService, PartnoService, AuthService, $state){
		// PartnoService.sayHello();
		$scope.order = {
			editorId: 007,
			companyId: 234,
			customerId: 123,
			remark:"hehe",
		}
		$state.go("main.product_barcode"); 
			// if not authed should be prevented
		$scope.dirtyRow = undefined;

		$scope.generateBarcode = function(){
			$scope.order.barcode = barcodeService.generate();
			toastService.showSimpleToast("Generate Barcode: " + $scope.order.barcode, 30000);
		
		}

		$scope.onSubmit = function(user){
			AuthService.login(user).then(function(data){
				$state.go("main.products_barcode");
			}, function(error){
				alert(error)
			});
		}

		$scope.echo = function(){
			console.log("ohla")
		}
	} 
]);

