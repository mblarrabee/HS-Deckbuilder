angular.module("mainApp").service("getCardInfoService", function($q, $http){

    this.getAllCards = function(){
    
        var dfd = $q.defer();
        $http({
            method: 'GET',
            url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards",
            headers: {
                "X-Mashape-Key": "3ZiwEMEgp1msh8zmhMG762xCHTcsp1vICTtjsn9wNgkz23FsIM",
            }
        }).then(function(res){
                var allCards = res.data;
                allCards.Classes = [];
                for(var i = 0; i < res.data.Basic.length; i++){
                    if(allCards.Basic[i].type === "Hero"){
                        allCards.Classes.push(allCards.Basic[i]);   
                    }
                }
                dfd.resolve(allCards);
            })
        return dfd.promise;
    }
    
    this.getClassCards = function(charClass){
          
        var dfd = $q.defer();
            $http({
                method: 'GET',
                url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" + charClass,
                headers: {
                    "X-Mashape-Key": "3ZiwEMEgp1msh8zmhMG762xCHTcsp1vICTtjsn9wNgkz23FsIM",
                }
            }).then(function(res){
                    var classCards = res.data;
                    for(var i = 0; i < classCards.length; i++){
                        classCards[i].cardCount = 0;
                        if(!classCards[i].collectible || classCards[i].type == "Hero"){
                            classCards.splice(i,1);
                            i--;
                        }
                    }
                    dfd.resolve(classCards);
                })
        return dfd.promise;
    }
    
    this.getTypeCards = function(type){
        var dfd = $q.defer();
        $http({
                method: 'GET',
                url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/types/" + type,
                headers: {
                    "X-Mashape-Key": "3ZiwEMEgp1msh8zmhMG762xCHTcsp1vICTtjsn9wNgkz23FsIM",
                }
            }).then(function(res){
                    typeCards = res.data;
                    if(type == "Minion"){
                        for(var i = 0; i < typeCards.length; i++){
                            typeCards[i].cardCount = 0;
                            if(!typeCards[i].collectible || typeCards[i].playerClass){
                                typeCards.splice(i,1);
                                i--;
                            }
                        }
                        dfd.resolve(typeCards);
                    }
                })
        return dfd.promise;
    }
    
    this.getSetCards = function(set){
        
        var dfd = $q.defer();
        $http({
            method: "GET",
            url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/" + set,
            headers: {
                "X-Mashape-Key": "3ZiwEMEgp1msh8zmhMG762xCHTcsp1vICTtjsn9wNgkz23FsIM",
            }
        }).then(function(res){
                dfd.resolve(res.data);
            })
        return dfd.promise;
    }
    
    this.getClasses = function(){
        
        var dfd = $q.defer();
        $http({
            method: "GET",
            url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/Basic",
            headers: {
                "X-Mashape-Key": "3ZiwEMEgp1msh8zmhMG762xCHTcsp1vICTtjsn9wNgkz23FsIM",
            }
        }).then(function(res){
                var classes = [];
                for(var i = 0; i < res.data.length; i++){
                    if(res.data[i].type === "Hero"){
                        classes.push(res.data[i]);   
                    }
                }
                dfd.resolve(classes);
            })
        return dfd.promise;
    }
    
});