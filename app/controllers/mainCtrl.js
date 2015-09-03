angular.module("mainApp").controller("mainCtrl", function($scope, getCardInfoService, saveDeckService, $animate, $q, $filter, $compile){
   
    $scope.classChosen = false;
    var classes = ["Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];
    $scope.chosenCards = [];
    $scope.deckCardCount = 0;
   
    $scope.chooseClass = function(charClass){
        $scope.classChosen = true;
        $scope.charClass = charClass;
        for(var i in $scope.allCards.Classes){
            if($scope.allCards.Classes[i].playerClass === charClass){
                $scope.classImg = $scope.allCards.Classes[i].img;
            }
        }
    }
    
    $scope.addCard = function(chosenCardArray, cardPos){
        var card = $scope.allCards[chosenCardArray][cardPos];
        var filterCards = $scope.chosenCards.filter(function(value){
            return value == card;
        })
        if(filterCards.length < 2){
            if($scope.chosenCards.length < 30){
                if(card.rarity == "Legendary"){
                    for(var i = 0; i < $scope.chosenCards.length; i++){
                        if(card == $scope.chosenCards[i]){
                            return;
                        }   
                    }
                }
            $scope.chosenCards.push(card);
            $scope.deckCardCount++;
            }
        }
//        console.log(cardArray[cardPos].name);   
    }
    
    $scope.removeCard = function(cardIndex){
        $scope.chosenCards.splice(cardIndex, 1);
        $scope.deckCardCount--;
    }
    
    $scope.returnToCharSelect = function(){
        var back = confirm("Your deck has not been saved. Would you like to continue?");
        if(back == false){
            return;
        }
        if(back == true){
            $scope.chosenCards = [];
            $scope.deckCardCount = 0;
            $scope.classChosen = false;
        }
    }
    
    $scope.addDeck = function(){
        console.log("in ctrl");
        console.log($scope.chosenCards);
        saveDeckService.saveDeck($scope.myDeckName, $scope.myDeckDescription, $scope.chosenCards);
    }
    
    getCardInfoService.getAllCards().then(function(allRes){
            $scope.allCards = allRes;
            var promiseArr = [];
            classes.forEach(function(item){
                $scope.allCards[item] = [];
                var dfd = $q.defer();
                promiseArr.push(dfd.promise);
                getCardInfoService.getClassCards(item).then(function(classRes){
                        $scope.allCards[item] = classRes;
                        dfd.resolve();
                })
               
            })
            $scope.allCards.Minion = [];
            getCardInfoService.getTypeCards("Minion").then(function(typeRes){
                $scope.allCards.Minion = typeRes;
            })
            $q.all(promiseArr).then(function(){
                console.log("all done")
                console.log($scope.allCards.Minion);
            })
        console.log($scope.allCards);
    })
    
  
    
    function getSetCards(set){
        getCardInfoService.getSetCards(set).then(function(res){
            console.log(res);
            return res;
        })
    }
    
    function getClasses(){
        getCardInfoService.getClasses().then(function(res){
            console.log(res);
            return res;
        })
    }
    
});