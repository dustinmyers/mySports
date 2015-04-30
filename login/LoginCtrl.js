var app = angular.module('sportsApp');

app.controller('LoginCtrl', function($scope, loginService, $mdDialog, $firebaseAuth, fb, $location) {

  console.log('instantiated LoginCtrl');

  $scope.login = function () {
    loginService.login($scope.login).then(function(user){
      user.uid = user.uid.replace('simplelogin:', '');
      console.log(user.uid);
      $location.path('/home/')
    }, function(err){
      console.log(err);
    })
  };
 
    $scope.userEmail = undefined;
    $scope.userPassword = undefined;

})