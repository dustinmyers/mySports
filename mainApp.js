angular.module('sportsApp', ['firebase', 'ngRoute', 'ngMaterial'])
	.run(function($rootScope, $location) {
		$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
		  // We can catch the error thrown when the $requireAuth promise is rejected
		  // and redirect the user back to the home page
		  if (error === "AUTH_REQUIRED") {
		    $location.path("/startup");
		  }
		});
		})
	.config(function($routeProvider, $mdThemingProvider, fb) {
		
		$routeProvider
			.when('/login', {
				templateUrl: 'login/loginTmpl.html',
				controller: 'LoginCtrl',
			})
			.when('/home', {
				templateUrl: 'home/homeTmpl.html',
				controller: 'HomeCtrl',
				resolve: {
				    user: function(loginService) {
				      return loginService.Auth();
				    },
				    gamesRef: function(gameService) {
				    	return gameService.getGames();
				    },
				    // myGamesRef: function(gameService) {
				    // 	return gameService.myGames();
				    // }
				}
			})
			.when('/startup', {
				templateUrl: 'startup/startupTmpl.html',
				controller: 'StartupCtrl',
			})
			.when('/new-game', {
				templateUrl: 'addGame/addGameTmpl.html',
				controller: 'AddGameCtrl',
				resolve: {
				    user: function(loginService) {
				      return loginService.Auth();
				    }
				}
			})
			.otherwise({redirectTo:'/home'})

		$mdThemingProvider.theme('default')
	  	.primaryPalette('blue-grey')
	   	.accentPalette('deep-purple')

	})
	.constant('fb', {
		url: 'https://right-now-sports.firebaseio.com/'
	});