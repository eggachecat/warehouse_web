app.service('ProductService', function(DataService, CommonService, $http){

	
	this.read_partno = function(params){
		params.type = "resvobject"
		console.log(params)
		return DataService.get("/warehouse/list", params)
	}

	this.create_storage = function(data){
		return DataService.post("/warehouse/createStorage", data)
	}
})

