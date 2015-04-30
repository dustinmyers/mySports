var app = angular.module('sportsApp');
app.service('loginService', function(fb, $firebaseAuth) {

	var ref = new Firebase('https://right-now-sports.firebaseio.com/');
	var authObj = $firebaseAuth(ref);

	this.Auth = function() {
	    return ref.getAuth();
	};

	//login method to be called from our controller. The callback is then passed the authenticated user

	this.login = function(user, cb){
		return authObj.$authWithPassword({
			email    : user.email,    //Email and Password come from our login form 
			password : user.password
		})
	}

	this.facebookLogin = function() {
		authObj.authWithOAuthPopup("facebook", function(error, authData) {
			if (error === null) {
				console.log('inside facebook')
			} else {
			 	console.log('something went wrong');
			}
		}, {
		  remember: "sessionOnly",
		  scope: "email,user_likes"
		});
    return results;
	};

	this.googleLogin = function() {
		authObj.authWithOAuthPopup("google", function(error, authData) {
			if (error === null) {
				console.log('inside google')
			} else {
			 	console.log('something went wrong');
			}
		}, {
		  remember: "sessionOnly",
		  scope: "email,user_likes"
		});
    return results;
	};

	this.logoutFn = function() {
		return authObj.$unauth();
	}

});