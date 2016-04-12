app.directive('restricted', ['AuthService', function(AuthService){
	// Runs during compile
	return {
		scope: false,
		restrict: 'A', 
    link: function($scope, iElm, iAttrs, controller) {
        if (iAttrs.restricted){
            var accessible = false;
            var role = AuthService.getUserRole();

            var accessibleRoles = iAttrs.access.split(" ");
           
            angular.forEach(accessibleRoles, function(access){
                 if(role == access){
                    accessible = true;
                }
            })


            if(! accessible){
                angular.forEach(iElm.children(), function(elm){
                    try{
                        elm.remove();
                    }catch(ignore){}
                });
                iElm.remove();           
            }
        }

    }
	};
}]);

app.directive('barCode', function(){

    return {
        template: '<img id="barcode" style="float:right;"></img>',
        link: function($scope, iElm, iAttrs, controller) {
            console.log(iAttrs["codeValue"]);

            $scope.$watch(iAttrs.codeValue, function(value){
                if(value === undefined) {
                    return
                }
                JsBarcode("#barcode", String(value), {
                    width: 2,
                    height: 75, 
                    ineColor: "#0cc"
                });
                
            })   
        }
    };
});
app.directive('print', function(PrintService, CanvasService){
    // Runs during compile
    return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs, controller) {
            $scope.printPreview = function(){
                console.log("print")
                CanvasService.getData(iElm).then(function(data){
                    PrintService.preview({dataUrl: data})
                })
            }
        }
    };
});

app.directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
}]);