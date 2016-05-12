app.service('AuthService', function($q, $http, API_ENDPOINT, AUTH_ROLES, $state) {
	var LOCAL_TOKEN_KEY = 'warehouse:auth-token-key';
	var isAuthenticated = false;
	var userRole = AUTH_ROLES["privilege-3"];// Guest
	var authToken = "undefined";

	function decodeData(token) {
	  var tokenData = token.split('.')[1];
	  //bass64 decode
	  return JSON.parse(window.atob(tokenData));	
	}

	function getPrivilege(tokenObj){
		return "privilege-" + tokenObj["privilage"]
	}

	function useCredentials(token) {
		isAuthenticated = true;
		authToken = token;
		tokenObj = decodeData(token)

		// Get Role
		userRole = AUTH_ROLES[getPrivilege(tokenObj)];
		console.log(tokenObj, userRole)
		// Set the token as header for your requests!
		$http.defaults.headers.common.token = authToken;
		console.log("ohlala")
		$state.go("main.products_barcode")
	}
 
 	function loadUserCredentials() {
		var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
		console.log(token)
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
		$http.defaults.headers.common.token = undefined;
		window.localStorage.removeItem(LOCAL_TOKEN_KEY);
	}
 
	var register = function(user) {
		return $q(function(resolve, reject) {
			$http.post(API_ENDPOINT.url + '/user/add', user).then(function(result, status) {
				console.log(result, status)
				if (result.data.valid) {
					resolve(result.data.msg);
				} else {
					reject(result.data.msg);
				}
			}, function(err){
				console.log(err)
			});
		});
	};
 
	var login = function(user) {
		return $q(function(resolve, reject) {
		
			$http.post(API_ENDPOINT.url + '/user/login', user).then(function(result) {
				console.log(result)
				if (result.data.valid) {
					console.log(result.data.token)
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
 
app.factory('barcodeService', function(){
	var generate = function(){
	  function uuid() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return uuid() + uuid() + uuid() 
	}

	return {
		generate: generate
	}

});

app.service('CanvasService', ['$q', function($q){
	this.getData = function(element) {
		var data = $q.defer();
		html2canvas(element, {
			onrendered: function(canvas) {
    			data.resolve(canvas.toDataURL());
	    	}
		});
		return data.promise
	}
}])



app.factory('PrintService', ['$mdDialog', '$mdMedia', function($mdDialog, $mdMedia){

	var preview = function(input, closeFn){

		$mdDialog.show({
	      controller: function($scope){
	      	$scope.input = input;
	      	$scope.download = function(download) {
			    $mdDialog.hide(download);
			 };
	      },
	      templateUrl: './app/components/dialogs/print-template.html',
	      clickOutsideToClose: true,
	      fullscreen: true
	    })
	    .then(function(download) {
	    	console.log(download);
	    }, function() {});
	}
	return{
		preview: preview
	};
}])

app.factory('CommonService', ['$http', function($http){
	var rootUrl = "http://private-a4897-warehousebackend.apiary-mock.com/url/list";
	var serverUrl = "140.138.17.10:5000";

	var getServerUrl = function(){
		console.log("serverUrl")
		$http.get(rootUrl).then(function(res){
			serverUrl = res.data.server;
			console.log(serverUrl)
		})
	}
	//getServerUrl();
	return {
		getRequestUrl: function(){
			return serverUrl;
		}
	};
}])
app.factory('DataService', ['API_ENDPOINT', '$q', '$http', function(API_ENDPOINT, $q, $http){
	var userListUrl = API_ENDPOINT.url + "/user/list";

	function getData(url){
		console.log(url);
		var deferData = $q.defer();
		$http.get(url).then(function(result) {
			deferData.resolve(result.data);
		}, function(err){
			deferData.reject(result.data);
		});

		return deferData.promise
	}
	return{
		getUserList: function(){ return getData(userListUrl) }
	};
}])
app.service('toastService', ['$mdToast', function($mdToast){
	this.showSimpleToast = function(content, type, delay, position) {
		var typeThemeMap = {
			"error": "error-toast",
			"success": "success-toast"
		}

		var _position = position || "top right";
		var _delay = _delay || 5000;
		var _type = type || "general";
		var _theme = typeThemeMap[_type]
		console.log(_theme)
	  	$mdToast.show(
		  	$mdToast.simple()
		  	.textContent(content)
		  	.position(_position)
	    	.hideDelay(_delay)
	    	.theme(_theme)
	  	);
	};
}])