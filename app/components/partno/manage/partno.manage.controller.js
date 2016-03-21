app.controller('PartnoManageCtrl', ['$scope', 'barcodeService', 'toastService', 'PartnoService', 
	function($scope, barcodeService, toastService, PartnoService){
		// PartnoService.sayHello();
		$scope.selected = [];

		$scope.query = {
			order: 'name',
			limit: 5,
			page: 1
		};

		function getDesserts(query) {
			$scope.promise = $nutrition.desserts.get(query, success).$promise;
		}

		function success(desserts) {
			$scope.desserts = desserts;
		}

		$scope.desserts = {
			data: [{
				editorId: 233,
				companyId: "2333",
				customerId: "23333",
				remark: "233333"
			},{
				editorId: 1233,
				companyId: "2333",
				customerId: "23333",
				remark: "233333"
			}]
		}

		$scope.onPaginate = function (page, limit) {
			getDesserts(angular.extend({}, $scope.query, {page: page, limit: limit}));
		};

		$scope.onReorder = function (order) {
			getDesserts(angular.extend({}, $scope.query, {order: order}));
		};

		
	} 
]);