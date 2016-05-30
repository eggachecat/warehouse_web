app.service('AccountService', function(AuthService, DataService, $q, $http, API_ENDPOINT, AUTH_ROLES){

	this.privilegeMap = {1: "管理權限", 2: "一般權限", 3: "隨便權限"};
	this.activeMap = {true: "鎖定帳戶", false: "解鎖帳戶"}
	
	this.psdLegel = function(psd){
		console.log(psd)
		if(angular.isUndefined(psd) || psd == null || psd == "")
			return false;
		return true;
	}

	this.update = function(user){
		return DataService.post("/user/update", user)
	}

	this.read = function(){
		return DataService.get("/user/list")
	}

	this.unlock = function(user){
		return DataService.post("/user/unlock", user)
	}
})