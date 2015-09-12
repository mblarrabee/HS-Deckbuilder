angular.module("mainApp").service("loginService", function($q, $firebaseAuth, $firebaseObject, $firebaseArray){

	var ref = new Firebase("https://hs-deckbuilder.firebaseio.com/");
	var userRef = new Firebase("https://hs-deckbuilder.firebaseio.com/users");
	var allUsers = $firebaseArray(userRef);
	console.log(allUsers);
	allUsers.$loaded().then(function(){
		console.log(allUsers.length);		
	})

	Object.size = function(obj) { 
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)){
				size++;
			}
		}
		return size;
	};

	console.log(Object.size(allUsers));

	var authObject = $firebaseAuth(ref);
	var currentUser;


	this.registerNewUser = function(newUser){
		var dfd = $q.defer();
		for(var i in allUsers){
			if(allUsers[i].username == newUser.userName){
				dfd.reject("Username already taken");
				alert("Username already taken")
				return dfd.promise;
			}
		}
		ref.createUser({
			email: newUser.email,
			password: newUser.password

		}, function(error, userData) {
			if (error) {
				console.log(error);
				alert(error);
				dfd.reject(error);
			}else{
				userData.username = newUser.userName;
				userRef.push({username: newUser.userName, email: newUser.email});
				currentUser = newUser.userName;
				var fbLogin = new Firebase("https://hs-deckbuilder.firebaseio.com/");
				fbLogin.authWithPassword({
					email: newUser.userName,
					password: newUser.password
				}, function(error, userData){
					if (error) {
						console.log(error);
					}else{
						console.log(userData);
					}
				})
				dfd.resolve(userData);
			}
		})
		return dfd.promise;
	}

	this.login = function(user){
		var dfd = $q.defer();
		var fbLogin = new Firebase("https://hs-deckbuilder.firebaseio.com/");

		fbLogin.authWithPassword({
			email: user.email,
			password: user.password
		}, function(error, userData){
			if (error) {
				alert(error);
				dfd.reject(error);
			}else{
				for(var i = 0; i < allUsers.length; i++){
					if(allUsers[i].email == user.email){
						currentUser = allUsers[i].username;
						userData.username = allUsers[i].username;
					}
				}
				dfd.resolve(userData);
			}
		})
		return dfd.promise;
	}

	this.logoutUser = function(){
		var fbLogout = new Firebase("https://hs-deckbuilder.firebaseio.com/");
		fbLogout.unauth();
		alert("You have logged out");
		$(".login_logout").text("LOGIN");
	}

	this.getCurrentUser = function(){
		var logRef = new Firebase("https://hs-deckbuilder.firebaseio.com/");
        var authData = logRef.getAuth();
        if(authData){
        	if(!currentUser){
        		console.log("in!cu");
        		allUsers.$loaded().then(function(){
					for(var i = 0; i < allUsers.length; i++){
	        			console.log("inloop");
	        			if(allUsers[i].email == authData.password.email){
	        				console.log("foundmatch");
	        				currentUser = allUsers[i].username;
	        				$(".login_logout").text("User:" + currentUser + " LOGOUT");
	        			}
        			}		
				})
        	}
        	console.log(currentUser);
        	return currentUser;
        }else{
        	console.log("no user logged in");
        	return "Anonymous";
        }
	}



})




// .then(function(authData){
// 			console.log(authData);
// 			var id = authData.uid.replace("simplelogin", "");
// 			var userRef = new Firebase("https://hs-deckbuilder.firebaseio.com/" + uid);
// 			var userObj = $firebaseObject(userRef);
// 			userObj.email = newUser.email;
// 			userObj.userName = newUser.userName
// 			userObj.$save().then(function(res){
// 				authObject.$authWithPassword(
// 					{
// 						email: newUser.email,
// 						password: newUser.password
// 					}
// 				).then(function(loggedInUser){
// 					dfd.resolve(loggedInUser);
// 				})
// 			})
// 		})