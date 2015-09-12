angular.module("mainApp").service("saveDeckService", function($q, $firebaseArray){

    var ref = new Firebase("https://hs-deckbuilder.firebaseio.com/decks");
        
    this.saveDeck = function(deckName, deckDescription, deckList, user){
        var newDeckObj = {};
        newDeckObj.Name = deckName;
        newDeckObj.Description = deckDescription;
        newDeckObj.Cards = deckList;
        newDeckObj.CreatedBy = user;
        console.log(newDeckObj);
        for(var i = 0; i < newDeckObj.Cards.length; i++){
            delete newDeckObj.Cards[i].$$hashKey;   
        }
        console.log(newDeckObj);
        ref.push({Name: deckName, Description: deckDescription, Cards: deckList, CreatedBy: user});
        alert("Deck Saved!!");
    }
})