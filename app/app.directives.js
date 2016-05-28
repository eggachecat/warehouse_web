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

app.directive('barCode', function(barcodeService){
    return {
        restrict: 'AE',
        link: function($scope, iElm, iAttrs, controller) {

            var self = {};
            self.barCodeValue = iAttrs.codeValue;
            self.img = iElm[0];
          
            function draw(v){       
                console.log("draw the barcode")
                JsBarcode(self.img, v, {
                    width: 2,
                    height: 120, 
                    displayValue: true,
                    ineColor: "#0cc"
                });  
            }

            function isDefined(v){
                return ! (angular.isUndefined(v) || v == null || v == "")
            }

            function handleBarcode() {
                self.barCodeValue = iAttrs.codeValue;
                if(isDefined(self.barCodeValue)){
                    self.fileName = String(self.barCodeValue);
                    draw(self.fileName);
                }
            }
            handleBarcode();
            iAttrs.$observe('codeValue', function(value){   
                console.log("codeValue change")
               handleBarcode();
            })

            $scope.$on('download-barcode', function(event, args){
                console.log("broadcast to download ", args, ", and this fileName is ",self.fileName)
                if(self.fileName == args.key){
                    barcodeService.download(self.img.src, self.fileName + '.png')
                }
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
      }, 500);
    }
  }
}]);