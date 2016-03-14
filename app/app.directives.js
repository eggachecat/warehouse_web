app.directive('restrictedArea', ['AuthService', function(AuthService){
	// Runs during compile
	return {
		scope: false,
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
	 	compile:  function(element, attr, linker){
            var accessible = false;
            var role = AuthService.getUserRole();

            var accessibleRoles = attr.access.split(" ");
           
            angular.forEach(accessibleRoles, function(access){
            	 if(role == access){
                    accessible = true;
                }
            })


            if(! accessible){
				angular.forEach(element.children(), function(elm){
					try{
						elm.remove();
					}catch(ignore){}
				});
                element.remove();           
            }

        }
	};
}]);