app.controller('ProductUpdateCtrl', ['$scope', 'toastService', 'ProductService', '$state', '$mdDialog', 
	function($scope, toastService, ProductService, $state, $mdDialog){

		
		function init(){
			$scope.productInfo = {};
			$scope.editable = false;
			$scope.storagebarcode = "";
			$scope.querying = false;
		}
		init();

		$scope.search = function(){
			$scope.querying = true;
			ProductService.read_product($scope.productInfo)
				.then(function(res){
					$scope.results = res.data;
					$scope.querying = false;
				})
		} 

		$scope.barcode_search = function(){
			$scope.querying = true;
			console.log("!")
			ProductService.read_product({storagebarcode: $scope.storagebarcode})
				.then(function(res){
					$scope.barcode_result = res.data[0];
					$scope.querying = false;
				})
		} 


		$scope.update = function(result){
			ProductService.update_product(result)
			.then(function(res){
				console.log(res)
				toastService.showSimpleToast("產品更新成功", "success")
				init();
			}, function(err){
				var errMsg = err.message || "產品更新失敗"
				toastService.showSimpleToast(errMsg, "error")
			});
		}

		$scope.edit = function(result) {
		    $mdDialog.show({
	      		controller: function($scope, $mdDialog){
					$scope.result = result;
					$scope.cancel = function() { $mdDialog.cancel(); };
					$scope.update = function(){
						$mdDialog.hide($scope.result); 
					}

				},
		      	templateUrl: './app/components/product/update/product_update-pop.html',
		      	parent: angular.element(document.body),
		      	//targetEvent: ev,
		      	clickOutsideToClose:true,
		      	fullscreen: false
		    })
		    .then(function(res) {
	    		$scope.update(res);
		    }, function() {
		      	console.log("取消保存")
		    });
	  	};
	}
]);


// ceb0f4bb91c29e43