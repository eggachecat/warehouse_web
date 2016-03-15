var app = angular.module('app', ["firebase", 'ngAnimate', "ui.router", 'ngMaterial', 'ngMessages']);

app.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})
app.constant('API_ENDPOINT', {
  url: 'http://localhost:8080/api'
});

app.constant('AUTH_ROLES', {
	admin: 'role-admin',
	normal: 'role-normal',
	guest: 'role-guest'
});

app.config(['$stateProvider', '$urlRouterProvider' , '$mdThemingProvider', '$locationProvider', '$httpProvider', 
	function($stateProvider, $urlRouterProvider, $mdThemingProvider, $locationProvider, $httpProvider) {

		$mdThemingProvider.theme('docs-dark', 'default')
	      .primaryPalette('yellow')
	      .backgroundPalette('light-blue')
	      .dark();
	  //   $locationProvider.html5Mode({
			//   enabled: true,
			//   requireBase: false
			// })


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
		    	templateUrl: "./app/components/main.html",
		    })
		    .state('main.enter', {
				url: "/enterwarehouse",
				controller: "EnterCtrl",
				templateUrl: "./app/components/enter/enter.html"
		    })
		    .state('main.order', {
				url: "/order",
				controller: "OrderCtrl",
				templateUrl: "./app/components/order/order.html"
		    })
		    .state('main.dashboard', {
				url: "/dash",
				controller: "DashboardCtrl",
				templateUrl: "./app/components/dashboard/dashboard.html"
		    })
	}
])
app.controller('NavCtrl', ['$scope', "$state", 'AuthService', function($scope, $state, AuthService){
	$scope.navigateTo = function(stateName, obj){
		if(obj == null || obj == undefined){
			$state.go(stateName);
		} else {
			$state.go(stateName, obj);
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
