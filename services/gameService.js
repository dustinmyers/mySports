var app = angular.module('sportsApp');
app.service('gameService', function(fb, $firebaseArray) {

	this.sports = [
	    { name: 'Frisbee' },
	    { name: 'Soccer' },
	    { name: 'Football' }, 
	    { name: 'Softball' },
	    { name: 'Volleyball' },
	    { name: 'Disc Golf' },
	];

	this.getGames = function() {
		return new Firebase(fb.url + '/games/');
	}

	var user

	this.addNewGame = function(game, sport, uid) {
		game.day = game.date.toISOString();
		var myGame = $firebaseArray(new Firebase(fb.url + '/users/' + uid + '/events/'));	
		var allGames = $firebaseArray(new Firebase(fb.url + '/games/'));
		var newEvent = {
			game: game,
			sport: sport
		};

		return myGame.$add(newEvent), allGames.$add(newEvent);
	};
  
});