app.controller('LoginCtrl', ['$scope', '$state', 'AuthService',
	function($scope, $state, AuthService){
		$scope.onSubmit = function(user){
			// console.log(user.password, user.account);
			// AuthService.register(user).then(function(msg){
			// 	 $state.go('main.form');
			// });
			$state.go('main.form');
		}
	}
]);