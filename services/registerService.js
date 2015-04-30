var app = angular.module('sportsApp');

app.service('registerService', function(){
	//Just a reference to the firebase endpoint
	var firebaseUrl = 'https://right-now-sports.firebaseio.com/'
	//Creates an object using the Firebase Constructor with our endpoint passed in 
	var firebaseLogin = new Firebase(firebaseUrl);

	this.register = function(user, cb){
		firebaseLogin.createUser({
			email: user.email,
			password: user.password
		}, function(error) {
			if (error === null) {
				console.log("User created successfully");
				firebaseLogin.authWithPassword({
						email    : user.email,
						password : user.password
					}, function(err, authData) {
				  if (authData) {
				  	authData.name = user.name;
				  	authData.timestamp = new Date().toISOString();
				    firebaseLogin.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
				    cb(authData);
				  } else {
				  	console.log('something went wrong');
				  }
				});
			} else {
				console.log("Error creating user:", error);
				return false;
			}
		});
	}
});

