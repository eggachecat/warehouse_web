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
		    	templateUrl: "./app/components/navi/navi.html",
		    })	.state('main.products_barcode', {
					url: "/products/barcode",
					controller: "ProductsBarcodeCtrl",
					templateUrl: "./app/components/products/barcode/products_barcode.html"
			    }).state('main.products_enter', {
					url: "/products/enter",
					controller: "ProductsEnterCtrl",
					templateUrl: "./app/components/products/enter/products_enter.html"
			    })
		    	.state('main.products_out', {
					url: "/products/out",
					controller: "ProductsOutCtrl",
					templateUrl: "./app/components/products/out/products_out.html"
			    })
			   .state('main.partno_add', {
					url: "/partno/add",
					controller: "PartnoAddCtrl",
					templateUrl: "./app/components/partno/add/partno_add.html"
			    })
			   .state('main.partno_manage', {
					url: "/partno/manage",
					controller: "PartnoManageCtrl",
					templateUrl: "./app/components/partno/manage/partno_manage.html"
			    }) 
			   .state('main.account', {
					url: "/account",
					controller: "AccountCtrl",
					templateUrl: "./app/components/account/account.html"
			    });
		   
	}
])

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
