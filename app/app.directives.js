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
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: true, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<img id="barcode" style="float:right;"></img>',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
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