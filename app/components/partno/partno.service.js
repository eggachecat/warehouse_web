app.factory('PartnoService', ['$q', 'AuthService', 'CommonService', '$http',
	function($q, AuthService, CommonService, $http){
		var url = CommonService.getRequestUrl();
		var add = function() {
			var targetUrl = url + "/storage/first"

			$http.post(url).then(function(res){

			})

			return deferred.promise;
		}
		return {
		}
	}
])

