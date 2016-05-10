app.controller('NavCtrl', ['$scope', "$state", 'AuthService', function($scope, $state, AuthService){
	$scope.navigation = [
							{ state: "main.partno_add" },
							{ state: "main.partno_manage", restricted: true, access: "role-admin" },
							{ state: "main.products_barcode" },
							{ state: "main.products_enter" },
							{ state: "main.products_out" },
							{ state: "main.account_add", restricted: true, access: "role-admin" },
							{ state: "main.account_manage", restricted: true, access: "role-admin" }

						];
	$scope.stateNameTable = {
		"main.partno_add": "料號新增",
		"main.partno_manage": "料號管理",
		"main.products_enter": "產品入庫",
		"main.products_out": "產品出庫",
		"main.products_barcode": "產品條碼",
		"main.query_products": "產品查詢",
		"main.account_add": "帳戶新增",
		"main.account_manage": "帳戶管理"
	}
	$scope.current = $state.current.name;



	$scope.navigateTo = function(state, obj){
		$scope.current = state;
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
