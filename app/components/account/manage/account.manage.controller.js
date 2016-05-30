app.controller('AccountManageCtrl', function($scope, AuthService, AccountService, toastService, $mdDialog, $state){
	$scope.privilegeMap = AccountService.privilegeMap;
	$scope.query = {
		order: 'username',
		limit: 5,
		page: 1
	};	
	$scope.querying = false;

	function getData(){
		$scope.querying = true;
		AccountService.read().then(function(data){
			$scope.userList = data.list;
			//$scope.querying = false;
		})
	}
	getData();

	$scope.refresh = function(){ getData() }

	var self = this;
	self.save = function(user){
		AccountService.update(user).then(function(){
			getData();
			toastService.showSimpleToast("帳戶資料更新成功", "success");
			$state.reload();
		}, function(err){
			var errMsg = err.msg || "帳戶資料更新失敗"
			toastService.showSimpleToast(errMsg, "error")
		})
	}

	

	$scope.edit = function(user) {
	    $mdDialog.show({
      		controller: function($scope, $mdDialog, AccountService){
				$scope.privilegeMap = AccountService.privilegeMap;
		  		$scope.activeMap = AccountService.activeMap;
		  		$scope.psdLegel = function(psd){ AccountService.psdLegel(psd) };

		  		$scope.user = user;
		  		$scope.infUser = {}; angular.copy(user, $scope.infUser);
		  		$scope.psdUser = {}; $scope.psdUser.username = user.username;	

		  		$scope.save = function(type) { 
		  			if(type == 'password'){
		  				$mdDialog.hide($scope.psdUser); 
		  			}else {
		  				$mdDialog.hide($scope.infUser); }
		  		};

		  		$scope.unlock = function(){
		  			AccountService.unlock($scope.psdUser);
		  		}
		  		
			  	$scope.cancel = function() { $mdDialog.cancel(); };
			},
	      	templateUrl: './app/components/account/manage/account_manage-pop.html',
	      	parent: angular.element(document.body),
	      	//targetEvent: ev,
	      	clickOutsideToClose:true,
	      	fullscreen: false
	    })
	    .then(function(newUser) {
    		self.save(newUser);
	    }, function() {
	      	console.log("取消保存")
	    });
  	};
})
