var pokedexApp = angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache','ngAnimate']);
var AppCtrl = pokedexApp.controller('pokedexApp', function($scope,$http) {
    $scope.pokemons = null;
    $scope.title = 'Pokedex';
    $scope.selectedPokemon = null;
    $scope.loading = false;
    $scope.initPokemons = function(){
        $scope.loading = true;
        $http.get('http://pokeapi.co/api/v1/pokemon/?limit=12').
        success(function(data, status, headers, config) {
            $scope.pokemons=data;
            $scope.loading = false;
            console.log("pokemons: ", data);
            $scope.pageIndex+=12;
        }).error(function(data, status, headers, config) {
            console.log("error: ", data, status);
        });
    };
    $scope.initPokemons();
    
    $scope.loadMore = function(url){
        $scope.selectedPokemon = null;
        $scope.loading = true;
        $http.get('http://pokeapi.co'+$scope.pokemons.meta.next).
        // $http.get('assets/main.json').
        success(function(data, status, headers, config) {
            if($scope.pokemons && data){
                $scope.pokemons.objects.push.apply($scope.pokemons.objects,data.objects);
                $scope.loading = false;
                $scope.pokemons.meta = data.meta;
                console.log("load more pokemons: ", data);
            }
        }).error(function(data, status, headers, config) {
            console.log("error: ", data, status);
        });
    };

    $scope.pokemonClick = function(pokemon, $event){
        $scope.selectedPokemon = pokemon;
    };

    $scope.getDetailsClass = function(last){
        var cssClass = last ? null: "typeDetails";
        return cssClass;
    };

    $scope.getTypeClass = function(name){
        var cssClass = null;
        switch(name){
            case 'normal':
                cssClass = "type normal";
                break;

            case 'fire':
                cssClass = "type fire";
                break;
            
            case 'grass':
                cssClass = "type grass";
                break;
            
            case 'poison':
                cssClass = "type poison";
                break;

            case 'water':
                cssClass = "type water";
                break;

            case 'bug':
                cssClass = "type bug";
                break;

            case 'flying':
                cssClass = "type flying";
                break;

            case 'ground':
                cssClass = "type ground";
                break;
            
            case 'electric':
                cssClass = "type electric";
                break;
            case 'fairy':
                cssClass = "type fairy";
                break;
            
            default:
                console.log('new type '+name);
                cssClass = "type normal";
        }
        return cssClass;
    }
});