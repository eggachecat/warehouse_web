app.service('PartnoService', function(DataService, CommonService, $http){

	
	this.add = function(order){
		return DataService.post("/warehouse/add", order)
	}

	this.read = function(params){
		params.type = "resvobject"
		console.log(params)
		return DataService.get("/warehouse/list", params)
	}
})

