var app = angular.module('sportsApp');

app.controller('StartupCtrl', function ($scope, registerService, $firebaseObject, $firebaseAuth, $firebaseArray, loginService, fb, $location, $mdDialog) {

	// $scope.login = function () {
	// 	loginService.login($scope.login).then(function(user){
	// 		user.uid = user.uid.replace('simplelogin:', '');
	// 		console.log(user.uid);
	// 		$location.path('/home/')
	// 	}, function(err){
	// 		console.log(err);
	// 	})
	// };

	var ref = 'https://right-now-sports.firebaseio.com/',
	  users = $firebaseArray(new Firebase(ref + '/users'))

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

	$scope.register = function () {
		if ($scope.details.password === $scope.confirmPassword) {
			return registerService.register($scope.details, function(user){
				user.uid = user.uid.replace('simplelogin:', '');
				$scope.$apply(function(){
					$location.path('/home/')
				});
			});
		} else {
			$scope.alert = '';
			$scope.showAlert = function(alert) {
			  $mdDialog.show(
			    $mdDialog.alert()
		        .title('Uh oh....')
		        .content('Looks like your passwords didn\'t match... Try agian!')
		        .ariaLabel('Alert Dialog Demo')
		        .ok('Got it!')
		        .targetEvent(alert)
			  );
			};
			$scope.showAlert(alert)
		}
	};

	$scope.google = function () {
		console.log('google clicked');
      return loginService.googleLogin(function(email) {
      	console.log("logged in with google: ", email);
      	$scope.$apply(function(){
					$location.path('/home/' + user.uid);
				});
      })

  };

  $scope.facebook = function () {
		console.log('facebook clicked')
    return loginService.facebookLogin(function(email) {
      	console.log("logged in with facebook: ", email);
      	$scope.$apply(function(){
					$location.path('/home/' + user.uid)
				});
      })
  };

  $scope.logout = function() {
  	loginService.logoutFn(function () { 
  		console.log('logged out', authObj);
  		$location.path('/startup/');
  	})
  }

});
