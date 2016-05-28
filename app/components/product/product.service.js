app.service('ProductService', function(DataService, CommonService, $http){

	
	this.read_partno = function(params){
		params.type = "resvobject"
		console.log(params)
		return DataService.get("/warehouse/list", params)
	}

	this.read_product = function(params){
		params.type = "storage"
		console.log(params)
		return DataService.get("/warehouse/list", params)
	}

	this.create_storage = function(data){
		return DataService.post("/warehouse/createStorage", data)
	}

	this.import = function(obj){
		return DataService.post("/warehouse/storage", obj);
	}

	this.update_product = function(obj){
		obj.type = "storage"
		console.log(obj)
		return DataService.post("/warehouse/update", obj);
	}

	this.export = function(obj){
		return DataService.post("/warehouse/export", obj);
	}
})

