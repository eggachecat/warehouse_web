app.service('AccountService', function(AuthService, DataService){

	this.privilegeMap = {1: "管理員", 2: "一般員工", 3: "隨便"};
})