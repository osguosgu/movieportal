// used modules
var mdb = angular.module('mdb', [
  'angularMoment',
  'ui.router',
  'ngResource',
  'ngAnimate',
  'ngAnimate-animate.css',
  'ngTouch',
  'ui.bootstrap',
  'angular-growl',
  'MDbControllers',
  'siyfion.sfTypeahead'
  ]);

// routes
mdb.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to home
    $urlRouterProvider.otherwise("/");

    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "../layouts/home.html",
            controller: 'HomeCtrl'
        })
        .state('hubs', {
            url: '/hubs',
            templateUrl: '../layouts/hubs.html',
            controller: 'HubsCtrl'
        })
        .state('hubs.create', {
            url: '/new',
            onEnter: function($stateParams, $state, $modal) {
                $modal.open({
                    templateUrl: '../layouts/create_hub.html',
                    controller: 'HubsCtrl'
                }).result.then(function(result) {
                        return $state.transitionTo("hubs");
                }, function(result) {
                        return $state.transitionTo("hubs");
                    });
            }
        })
        .state('hub_detail', {
            url: '/hubs/:id',
            controller: 'HubsCtrl',
            templateUrl: '../layouts/hub_detail.html'
        })
        .state('movie_detail', {
            url: "/movies/:id",
            controller: 'MoviesCtrl',
            templateUrl: "../layouts/movie_detail.html"
        })
        .state('movies', {
            url: "/movies",
            controller: 'MoviesCtrl',
            templateUrl: "../layouts/movies.html"
        })
        .state('movies.review', {
            url: '/review',
            onEnter: function($stateParams, $state, $modal) {
                $modal.open({
                    templateUrl: '../layouts/create_review.html',
                    controller: 'MoviesCtrl'
                }).result.then(function(result) {
                        return $state.transitionTo("movies");
                    }, function(result) {
                        return $state.transitionTo("movies");
                    });
            }
        })
        .state('own_profile', {
            url: "/profile",
            templateUrl: "../layouts/profile.html",
            controller: 'UsersCtrl'
        })
        .state('user_profile', {
            url: '/users/:id',
            controller: 'UsersCtrl',
            templateUrl: '../layouts/profile.html'
        })
});


// notification popup config
mdb.config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(2500);
    growlProvider.onlyUniqueMessages(false);
}]);

mdb.config(['$httpProvider', function($httpProvider) {
    var authToken = $("meta[name=\"csrf-token\"]").attr("content");
    $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
}]);

var MDbControllers = angular.module('MDbControllers', []);

mdb.directive('confirmClick', function() {
  return {
    restrict: 'A',
    link: function(scope, elt, attrs) {
      elt.bind('click', function(e) {
        var message = attrs.confirmation || "Are you sure?";
        if (window.confirm(message)) {
          var action = attrs.confirmClick;
          if (action)
            scope.$apply(scope.$eval(action));
        }
      });
    }
  };
});

// trigger event on enter keypress, e.g. <input ng-enter="function()">
mdb.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});