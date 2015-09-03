angular.module("mainApp").service("parseCardsService", function(){

    this.organizeCardSet = function(set){
        var setCards =  {
                            Druid: [],
                            Hunter: [],
                            Mage: [],
                            Paladin: [],
                            Priest: [],
                            Rogue: [],
                            Shaman: [],
                            Warrior: [],
                            Warlock: [],
                            Minion: [],
                            Spell: [],
                            Secret: [],
                            Weapon: []
                        };
        for(var i = 0; i < set.length; i++){
            if(set[i].collectible === true){
                if(set[i].playerClass && set[i].type !== "Hero"){
                    setCards[set[i].playerClass].push(set[i]); 
                }
                if(!set[i].playerClass){
                    setCards[set[i].type].push(set[i]);   
                }
            }
        }
        console.log(setCards);
        return setCards;
    }
});