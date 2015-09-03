angular.module("mainApp").controller("browseDecksCtrl", function($firebaseArray, $firebaseObject, $scope){

    var ref = new Firebase("https://hs-deckbuilder.firebaseio.com/decks");
    $scope.allDecks = $firebaseArray(ref);
    
    $scope.deckPin = false;
    
    $scope.pinDeck = function(){
        if(!$scope.deckPin){
            $scope.deckPin = true;
            $(".pinDeckBtn").html("Unpin Deck");
            return;
        }
        else if($scope.deckPin){
            $scope.deckPin = false;
            $(".pinDeckBtn").html("Pin Deck");
            return;
        }
    }
    
});