describe('AuthService', function() {
  beforeEach(module('app'));

  var AuthService, httpBackend;

  beforeEach(inject(function(_AuthService_, $httpBackend){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    AuthService = _AuthService_;
    httpBackend = $httpBackend;
  }));

  describe('admin login', function(){
    it('should fucked up', function(){
      
    })
  })

  describe('$scope.double', function() {
  	var $scope, controller;

  	beforeEach(function(){
  		var $scope = {};
      	var controller = $controller('mainController', { $scope: $scope });
  	})

    it('return double', function() {
      expect($scope.double(2)).toEqual(4);
    });

    it('return double', function() {
      expect($scope.double(2)).toEqual(4);
    });

    it('return double', function() {
      expect($scope.double(2)).toEqual(4);
    });
  });
});