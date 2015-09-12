angular.module("mainApp").controller("headerCtrl", function($scope, $firebaseAuth, loginService){

	$scope.login_logout = function(){
        var logRef = new Firebase("https://hs-deckbuilder.firebaseio.com/");
        var authData = logRef.getAuth();
        if(authData){
            loginService.logoutUser();
        }else{
            window.location.href = "/#/login";
        }
    }
})