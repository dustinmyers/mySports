var app = angular.module('sportsApp')
.controller('AddGameCtrl', function(user, $scope, gameService, $mdDialog, $firebaseObject, $firebaseAuth, fb, $location) {

  $scope.user = user;
    if(!user) {
      console.log('lost user')
      $location.path('/startup');
    };

	$scope.sports = gameService.sports;

	$scope.newGame = function() {

		gameService.addNewGame($scope.game, $scope.sport, user.uid)
			.then(function(ref) {
				if (ref) {
					$scope.alert = '';
					$scope.showAlert = function(alert) {
					  $mdDialog.show(
					    $mdDialog.alert()
				        .title('Game Scheduled!')
				        .content('Have fun!!')
				        .ariaLabel('Alert Dialog Demo')
				        .ok('Got it!')
				        .targetEvent(alert)
					  );
					};
					$scope.showAlert(alert)
				}	
				else {
					$scope.alert = '';
					$scope.showAlert = function(alert) {
					  $mdDialog.show(
					    $mdDialog.alert()
				        .title('Uh oh....')
				        .content('Looks like your game wasn\'t schedule... Try agian!')
				        .ariaLabel('Alert Dialog Demo')
				        .ok('Got it!')
				        .targetEvent(alert)
					  );
					};
					$scope.showAlert(alert)
				}
			});
	};

});