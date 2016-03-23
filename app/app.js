var app = angular.module('app', ["firebase", 'ngAnimate', "ui.router", 'ngMaterial', 'ngMessages', 'md.data.table']);

app.config(['$stateProvider', '$urlRouterProvider' , '$mdThemingProvider', '$locationProvider', '$httpProvider', 
	function($stateProvider, $urlRouterProvider, $mdThemingProvider, $locationProvider, $httpProvider) {

		$mdThemingProvider.theme('docs-dark', 'default')
	      .primaryPalette('yellow')
	      .backgroundPalette('light-blue')
	      .dark();

		$urlRouterProvider.otherwise("/login");
		$stateProvider
	    	.state('login', {
				url: "/login",
				controller: "LoginCtrl",
				templateUrl: "./app/login/login.html"
		    })
		    .state('main', {
		    	url: "/app",
		    	abstract: true,
		    	controller: "NavCtrl",
		    	templateUrl: "./app/components/nav.html",
		    })	.state('main.enter', {
					url: "/enterwarehouse",
					controller: "EnterCtrl",
					templateUrl: "./app/components/enter/enter.html"
			    })
			    .state('main.dashboard', {
					url: "/dash",
					controller: "DashboardCtrl",
					templateUrl: "./app/components/dashboard/dashboard.html"
			    })
			   .state('main.add_partno', {
					url: "/partno/add",
					controller: "PartnoAddCtrl",
					templateUrl: "./app/components/partno/add/add_partno.html",
					resolve: {

					}
			    })
			   .state('main.manage_partno', {
					url: "/partno/manage",
					controller: "PartnoManageCtrl",
					templateUrl: "./app/components/partno/manage/manage.partno.html"
			    });
		   
	}
])
app.controller('NavCtrl', ['$scope', "$state", 'AuthService', function($scope, $state, AuthService){
	$scope.navigation = [
							{ state: "main.add_partno" },
							{ state: "main.manage_partno" },
							{ state: "main.add_partno" },
							{ state: "main.add_partno" },
							{ state: "main.enter" },
							{ state: "main.dashboard" },
							{ state: "main.manage_partno", restricted: true, access: "role-admin" }
						];
	$scope.stateNameTable = {
		"main.add_partno": "料號新增",
		"main.manage_partno": "料號管理",
		"main.enter": "產品入庫",
		"main.dashboard": "產品出庫",
		"main.manage_account": "帳號管理",
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


app.run(function ($rootScope, $state, AuthService, AUTH_EVENTS, AUTH_ROLES) {
	$rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
		// if (!AuthService.isAuthenticated()) {
		// 	console.log(next.name);
		// 	if (next.name !== 'login' && next.name !== 'register') {
		// 		event.preventDefault();
		// 		$state.go('login');
		// 	}
		// }
		// if(AuthService.authoRole !== AUTH_ROLES.admin){
		// 		event.preventDefault();
		// 		$state.go('login');
		// }
	});
});

// 帳戶管理
// 	－建立帳號
// 	－修改密碼
// 訂單條碼
// 	－製作
// 	－管理
// 倉庫貨品條碼製作
// 產品入庫
// 產品出庫
