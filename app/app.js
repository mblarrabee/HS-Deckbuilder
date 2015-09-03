angular.module("mainApp", ["firebase", "ngRoute", "ngMaterial", "ngAnimate"]);

angular.module("mainApp").config(function($routeProvider){

    $routeProvider
        .when("/", {
            templateUrl: "app/views/homeTmpl.html",
            controller: "mainCtrl"
        })
        .when("/deckBuilder", {
            templateUrl: "app/views/deckBuilderTmpl.html",
            controller: "mainCtrl"
        })
        .when("/browseDecks", {
            templateUrl: "app/views/browseDecksTmpl.html",
            controller: "browseDecksCtrl"
        })
        .when("/login", {
            templateUrl: "app/views/loginTmpl.html",
            controller: "loginCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });
});