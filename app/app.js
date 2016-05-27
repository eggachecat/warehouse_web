var app = angular.module('app', ['ngAnimate', "ui.router", 'ngMaterial', 'ngMessages', 'md.data.table', 'ngFileSaver']);

app.config(['$stateProvider', '$urlRouterProvider' , '$mdThemingProvider', '$locationProvider', '$httpProvider',
	function($stateProvider, $urlRouterProvider, $mdThemingProvider, $locationProvider, $httpProvider) {

		$mdThemingProvider.theme('docs-dark', 'default')
	      .primaryPalette('yellow')
	      .backgroundPalette('light-blue')
	      .dark();
	    $mdThemingProvider.theme("success-toast")
	    $mdThemingProvider.theme("error-toast")

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
		    })	.state('main.product_barcode', {
					url: "/product/barcode",
					controller: "ProductBarcodeCtrl",
					templateUrl: "./app/components/product/barcode/product_barcode.html"
			    }).state('main.product_enter', {
					url: "/product/enter",
					controller: "ProductEnterCtrl",
					templateUrl: "./app/components/product/enter/product_enter.html"
			    })
		    	.state('main.product_out', {
					url: "/product/out",
					controller: "ProductOutCtrl",
					templateUrl: "./app/components/product/out/product_out.html"
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
			    .state('main.account_add', {
					url: "/account/add",
					controller: "AccountAddCtrl",
					templateUrl: "./app/components/account/add/account_add.html"
			    })
			    .state('main.account_manage', {
					url: "/account/manage",
					controller: "AccountManageCtrl",
					templateUrl: "./app/components/account/manage/account_manage.html"
			    });

	}
])

app.run(function ($rootScope, $state, AuthService, AUTH_EVENTS, AUTH_ROLES) {
	$rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
		if (!AuthService.isAuthenticated()) {
			console.log(next.name);
			if (next.name !== 'login' && next.name !== 'register') {
				event.preventDefault();
				$state.go('login');
			}
		}
	});
});
