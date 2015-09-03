angular.module("mainApp").directive("sideBarDeck", function(){

    return {
        restrict: "AE",
        scope: false,
        templateUrl: "/app/views/sideBarDeck.html",
        replace: true,
        link: function(scope, el, att ) {
        	(function() {});
        }
    }
})