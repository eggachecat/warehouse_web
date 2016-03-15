app.service('AuthService', function($q, $http, API_ENDPOINT, AUTH_ROLES) {
	var LOCAL_TOKEN_KEY = 'warehouseManageKey';
	var isAuthenticated = false;
	var userRole = AUTH_ROLES.guest;
	//var authToken = "undefined";
	var DEBUG = true;
	if(DEBUG == true){
		var authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsInJvbGUiOiJyb2xlLWFkbWluIn0.p5tlB2mwwJcxqHjp1uyKcJxrXEAKcK6fpzrdykBwZfA";
 		storeUserCredentials(authToken)
 	}

	function decodeData(token) {
	  var tokenData = token.split('.')[1];
	  //bass64 decode
	  return JSON.parse(window.atob(tokenData));	
	}

	function useCredentials(token) {
		isAuthenticated = true;
		authToken = token;
		userRole = decodeData(token)["role"];
		// Set the token as header for your requests!
		$http.defaults.headers.common.Authorization = authToken;
	}
 
 	function loadUserCredentials() {
		var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
		if (token) {
			useCredentials(token);
		}
	}

	function storeUserCredentials(token) {
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		useCredentials(token);
	}

	function destroyUserCredentials() {
		authToken = undefined;
		isAuthenticated = false;
		userRole = AUTH_ROLES.guest;
		$http.defaults.headers.common.Authorization = undefined;
		window.localStorage.removeItem(LOCAL_TOKEN_KEY);
	}
 
	var register = function(user) {
		return $q(function(resolve, reject) {
			$http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
				if (result.data.success) {
					resolve(result.data.msg);
				} else {
					reject(result.data.msg);
				}
			});
		});
	};
 
	var login = function(user) {
		return $q(function(resolve, reject) {
			$http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result) {
				if (result.data.success) {
					storeUserCredentials(result.data.token);
					resolve(result.data.msg);
				} else {
					reject(result.data.msg);
				}
			});
		});
	};

	var logout = function() {
		destroyUserCredentials();
	};
 
	loadUserCredentials();
 
	return {
		login: login,
		register: register,
		logout: logout,
		isAuthenticated: function() {
			return isAuthenticated;
		},
		getUserRole: function(){
			return userRole;
		}
	};
});

app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
app.service('barcodeService', ['', function(){
	
}])












