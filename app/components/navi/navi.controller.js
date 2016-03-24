app.controller('NavCtrl', ['$scope', "$state", 'AuthService', function($scope, $state, AuthService){
	$scope.navigation = [
							{ state: "main.partno_add" },
							{ state: "main.partno_manage" },
							{ state: "main.products_enter" },
							{ state: "main.products_out" },
							{ state: "main.products_enter" },
							{ state: "main.products_out" },
							{ state: "main.partno_manage", restricted: true, access: "role-admin" }
						];
	$scope.stateNameTable = {
		"main.partno_add": "料號新增",
		"main.partno_manage": "料號管理",
		"main.products_enter": "產品入庫",
		"main.products_out": "產品出庫",
		"main.query_products": "產品查詢"
	}
	$scope.current = $scope.stateNameTable[$state.current.name];


	$scope.navigateTo = function(state, obj){
		$scope.current = $scope.stateNameTable[state];
		if(obj == null || obj == undefined){
			$state.go(state);
		} else {
			$state.go(state, obj);
		}
	}

	$scope.logout = function(){
		AuthService.logout();
		$state.go("login");
	}
}])
