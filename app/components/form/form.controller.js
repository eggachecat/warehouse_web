app.controller('FormCtrl', ['$scope', 'toastService',function($scope, toastService){
	$scope.onSubmit = function(){
		toastService.showSimpleToast("Generate Hash Code", 30000);
	}
}]);
