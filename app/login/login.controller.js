app.controller('LoginCtrl', ['$scope', '$state', 'AuthService',
	function($scope, $state, AuthService){
		$scope.onSubmit = function(user){
			AuthService.login(user).then(function(data){
				
			}, function(error){
			
			});
		}
	}
]);
