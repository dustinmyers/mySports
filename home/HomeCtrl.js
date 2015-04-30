angular.module('sportsApp')
.controller('HomeCtrl', function(user, gameService, gamesRef, $scope, $firebaseArray, $mdDialog, $firebaseObject, $firebaseAuth, fb, $location) {

  $scope.user = user;
  if(!user) {
    console.log('lost user')
    $location.path('/startup');
  };

  var ref = 'https://right-now-sports.firebaseio.com/',
    users = $firebaseArray(new Firebase(ref + '/users'))

  $scope.games = $firebaseArray(gamesRef)
  console.log($scope.games)

  $scope.sports = gameService.sports;
	
  $scope.newGame = function () {
    console.log('clicked');
		$location.path('/new-game');
		console.log('routed to new-game')
	};

})

