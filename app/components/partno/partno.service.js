app.service('PartnoService', function(DataService, CommonService, $http){

	
	this.add = function(order){
		return DataService.post("/warehouse/add", order)
	}
})

