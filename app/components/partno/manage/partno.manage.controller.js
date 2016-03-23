app.controller('PartnoManageCtrl', ['$scope', 'barcodeService', 'toastService', 'PartnoService', 
	function($scope, barcodeService, toastService, PartnoService){
		// PartnoService.sayHello();
		$scope.selected = [];
		$scope.tags = [];
		$scope.query = {
			order: 'editorId',
			limit: 5,
			page: 1
		};

		$scope.desserts = {
			count: 6,
			data: [{
				editorId: 233,
				companyId: 1333,
				customerId: 23333,
				remark: "abv"
			},{
				editorId: 1233,
				companyId: 2333,
				customerId: 23333,
				remark: "cds"
			},{
				editorId: 1233,
				companyId: 333,
				customerId: 3333,
				remark: "bs"
			},{
				editorId: 1233,
				companyId: "2333",
				customerId: "23333",
				remark: "133333"
			},{
				editorId: 1233,
				companyId: "2333",
				customerId: "23333",
				remark: "233333"
			},{
				editorId: 1233,
				companyId: "2333",
				customerId: "23333",
				remark: "333333"
			}]
		}

		
		
	} 
]);