app.service('AccountService', function(AuthService, DataService, $q, $http, API_ENDPOINT, AUTH_ROLES){

	this.privilegeMap = {1: "管理員", 2: "一般員工", 3: "隨便"};

	// this.update = function(user){
	// 	console.log(user)
	// 	return DataService.requestServer({
	// 		method: "POST",
	// 		url: "/user/update",
	// 		data: user
	// 	})
	// }

	this.update = function(user){
		return DataService.post("/user/update", user)
	}

	this.read = function(){
		return DataService.get("/user/list")
	}
})