app.service('AuthService', function($q, $http, API_ENDPOINT, AUTH_ROLES, $state, DataService) {
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
		return "privilege-" + tokenObj["privilege"]
	}

	function useCredentials(token) {
		
		
		isAuthenticated = true;
		authToken = token;
		tokenObj = decodeData(token)
		console.log(tokenObj)
		// Get Role
		userRole = AUTH_ROLES[getPrivilege(tokenObj)];
	
		// Set the token as header for your requests!
		$http.defaults.headers.common.token = authToken;

		DataService.post("/user/token/valid").then(function(){
			console.log("!!")
			isAuthenticated = true;
		}, function(){
			alert("re-login");
			isAuthenticated = false;
			$state.go("login"); 
		})
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
		console.log(user)
		return $q(function(resolve, reject) {
			$http.post(API_ENDPOINT.url + '/user/add', user).then(function(result) {
				console.log(result)
				if (result.data.valid) {
					resolve(result.data);
				} else {
					reject(result.data);
				}
			}, function(err){
				reject(err);
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
 
app.factory('barcodeService', function(FileSaver, $rootScope){
	var generate = function(){
	  function uuid() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return uuid() + uuid() + uuid() 
	}

	var download = function(dataSrc, fileName){        
        FileSaver.saveAs(dataURLToBlob(dataSrc),  fileName)
    }

    function dataURLToBlob(dataURL) {
        var BASE64_MARKER = ';base64,';
      
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: contentType});
    }

    var callToDownload = function(fileName){
    	$rootScope.$broadcast('download-barcode', {key: fileName});
    }

	return {
		generate: generate,
		download: download,
		callToDownload: callToDownload
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

app.service('CommonService', ['$http', 'FileSaver', '$rootScope', function($http, FileSaver, $rootScope){
	var rootUrl = "http://private-a4897-warehousebackend.apiary-mock.com/url/list";
	var serverUrl = "140.138.17.10:5000";

	function dataURLToBlob(dataURL) {
        var BASE64_MARKER = ';base64,';
      
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: contentType});
    }


	this.getServerUrl = function(){
		console.log("serverUrl")
		$http.get(rootUrl).then(function(res){
			serverUrl = res.data.server;
			console.log(serverUrl)
		})
	}

	this.download = function(dataSrc, fileName){        
        FileSaver.saveAs(dataURLToBlob(dataSrc),  fileName)
    }

    this.isDefined = function(v){
        return ! (angular.isUndefined(v) || v == null || v == "")
    }

    this.callToDownload = function(fileName){
    	$rootScope.$broadcast('download-item', {key: fileName});
    }

}])
app.factory('DataService', ['API_ENDPOINT', '$q', '$http', function(API_ENDPOINT, $q, $http){
	
	function requestServer(httpObj){	
		var deferred = $q.defer();
		httpObj.then(function(result){
			console.log(result)
			if(result.data.valid){
				deferred.resolve(result.data);
			}else{
			
				deferred.reject(result.data);
			}
		})
		return deferred.promise
	}

	function get(dstUrl, params){
		dstUrl =  API_ENDPOINT.url + dstUrl
		if(angular.isUndefined(params)){
			return requestServer($http.get(dstUrl))
		}
		
		return requestServer($http.get(dstUrl, {params: params}))
	}
	function post(dstUrl, data){
		console.log(data)
		dstUrl =  API_ENDPOINT.url + dstUrl
		return requestServer($http.post(dstUrl, data))
	}

	return{
		get: get,
		post: post
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

// app.directive('keyboard', ['$timeout', function($timeout) {
//   return {
//     restrict: 'AE',
//     controller: function($scope){
//     	$scope.keyDown = function(e){
//     		console.log("key", e.keyCode)
//     		key = e.keyCode == 13 ? "enter" : e.keyCode - 48;
    		
//     		$scope.$broadcast("key-down", key);
//     	}
//     }
//   }
// }]);
