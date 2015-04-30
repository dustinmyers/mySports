var app = angular.module('sportsApp');

app.controller('AuthCtrl', function(user, $scope, $firebaseArray, $mdDialog, $firebaseObject, $firebaseAuth, fb, $location) {

var ref = 'https://right-now-sports.firebaseio.com/',
  games = $firebaseArray(new Firebase(ref + '/games')),
  users = $firebaseArray(new Firebase(ref + '/users')),
  user;

  $scope.games = games;

  //users
  $scope.users = users;

  //Auth
  $scope.authObj = $firebaseAuth(new Firebase(ref));

  var authData = $scope.authObj.$getAuth();
    if (authData) {
      console.log("Logged in as:", authData.uid);
    } else {
      console.log("Logged out");
    }

  $scope.authObj.$onAuth(function(authData) {
    $scope.authData = authData;
    
    if (authData) {
      var user = $firebaseObject(new Firebase(ref + '/users/' + authData.uid));
      
      user.$bindTo($scope, 'user');

      user.$loaded().then(function(user) {
        console.log('user', user);
        if (!user.email) {
          user.email = authData.password.email;
          user.$save();
        }
      });
      
    } else if ($scope.user) {
      delete $scope.user;
    }
  }) 

});