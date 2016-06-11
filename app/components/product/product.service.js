app.service('ProductService', function(DataService, CommonService, $http){

	function cleanParams(obj){
		var cleanObj = {}
		for (var prop in obj) {
		    if (!obj.hasOwnProperty(prop)) {
		        //The current property is not a direct property of p
		        continue;
		    }
		    //Do your logic with the property here
		    if(obj[prop]) {
		    	cleanObj[prop] = obj[prop]
		    };
		}
		return cleanObj;

	}
	// partno 59f2c005461cde14
	// storage 2e04daf8bd02cbd8
	// caixinru
	this.read_partno = function(params){
		params.type = "resvobject"
		console.log(cleanParams(params))
		return DataService.get("/warehouse/list", cleanParams(params))
	}

	this.read_product = function(params){
		params.type = "storage"
		console.log(cleanParams(params))
		return DataService.get("/warehouse/list", cleanParams(params))
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




