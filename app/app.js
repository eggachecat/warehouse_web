var app = angular.module('app', ["firebase", 'ngAnimate', "ui.router", 'ngMaterial', 'ngMessages', 'md.data.table']);

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
					templateUrl: "./app/components/partno/add/partno.add.html"
			    })
			   .state('main.manage_partno', {
					url: "/partno/manage",
					controller: "PartnoManageCtrl",
					templateUrl: "./app/components/partno/manage/partno.manage.html"
			    });
		   
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
