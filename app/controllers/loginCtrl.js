angular.module("mainApp").controller("loginCtrl", function($scope, loginService){
 
$scope.registerNewUser = function() {
	console.log($scope.user);
	
	loginService.registerNewUser($scope.user).then(function(user){
		if(user){
			$scope.user = user;
			console.log($scope.user);
			alert("You have logged in successfully");
			$(".login_logout").text("User:" + user.username + " LOGOUT");
			window.location.href = "/#/browseDecks";
		}
	})
}

$scope.loginUser = function() {
	loginService.login($scope.user).then(function(user){
		if(user){
			$scope.user = user;
			$(".login_logout").text("User:" + user.username + " LOGOUT");
			alert("Logged in successfully");
			console.log(user);
			window.location.href = "/#/browseDecks";
		}
	})
}

});