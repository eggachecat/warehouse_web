app.controller('FormCtrl', ['$scope', 'toastService',function($scope, toastService){

	var user = {
		id: "23333"
	};
	
	$scope.editor = user.id;

	$scope.onSubmit = function(){
		toastService.showSimpleToast("Generate Hash Code", 30000);
	}
}]);
