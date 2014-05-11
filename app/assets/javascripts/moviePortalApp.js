// used modules
var mdb = angular.module('mdb', [
  'angularMoment',
  'ngRoute',
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
mdb.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/hubs/:id', {
      templateUrl: '../layouts/hub_detail.html',
      controller: 'HubsCtrl'
    }).
    when('/hubs', {
            templateUrl: '../layouts/hubs.html',
            controller: 'HubsCtrl'
        }).
    when('/movies', {
      templateUrl: '../layouts/movies.html',
      controller: 'MoviesCtrl'
    }).
    when('/', {
        templateUrl: '../layouts/home.html',
        controller: 'HomeCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  }]);

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

mdb.filter('iif', function () {
   return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
   };
});


// typeahead for the search box
mdb.directive('typeahead', ["$timeout", function($timeout) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<div><form><input ng-model="term" ng-change="query()" type="text" autocomplete="off" /></form><div ng-transclude></div></div>',
        scope: {
            search: "&",
            select: "&",
            items: "=",
            term: "="
        },
        controller: ["$scope", function($scope) {
            $scope.items = [];
            $scope.hide = false;
 
            this.activate = function(item) {
                $scope.active = item;
            };
 
            this.activateNextItem = function() {
                var index = $scope.items.indexOf($scope.active);
                this.activate($scope.items[(index + 1) % $scope.items.length]);
            };
 
            this.activatePreviousItem = function() {
                var index = $scope.items.indexOf($scope.active);
                this.activate($scope.items[index === 0 ? $scope.items.length - 1 : index - 1]);
            };
 
            this.isActive = function(item) {
                return $scope.active === item;
            };
 
            this.selectActive = function() {
                this.select($scope.active);
            };
 
            this.select = function(item) {
                $scope.hide = true;
                $scope.focused = true;
                $scope.select({item:item});
            };
 
            $scope.isVisible = function() {
                return !$scope.hide && ($scope.focused || $scope.mousedOver);
            };
 
            $scope.query = function() {
                $scope.hide = false;
                $scope.search({term:$scope.term});
            }
        }],
 
        link: function(scope, element, attrs, controller) {
 
            var $input = element.find('form > input');
            var $list = element.find('> div');
 
            $input.bind('focus', function() {
                scope.$apply(function() { scope.focused = true; });
            });
 
            $input.bind('blur', function() {
                scope.$apply(function() { scope.focused = false; });
            });
 
            $list.bind('mouseover', function() {
                scope.$apply(function() { scope.mousedOver = true; });
            });
 
            $list.bind('mouseleave', function() {
                scope.$apply(function() { scope.mousedOver = false; });
            });
 
            $input.bind('keyup', function(e) {
                if (e.keyCode === 9 || e.keyCode === 13) {
                    scope.$apply(function() { controller.selectActive(); });
                }
 
                if (e.keyCode === 27) {
                    scope.$apply(function() { scope.hide = true; });
                }
            });
 
            $input.bind('keydown', function(e) {
                if (e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 27) {
                    e.preventDefault();
                };
 
                if (e.keyCode === 40) {
                    e.preventDefault();
                    scope.$apply(function() { controller.activateNextItem(); });
                }
 
                if (e.keyCode === 38) {
                    e.preventDefault();
                    scope.$apply(function() { controller.activatePreviousItem(); });
                }
            });
 
            scope.$watch('items', function(items) {
                controller.activate(items.length ? items[0] : null);
            });
 
            scope.$watch('focused', function(focused) {
                if (focused) {
                    $timeout(function() { $input.focus(); }, 0, false);
                }
            });
 
            scope.$watch('isVisible()', function(visible) {
                if (visible) {
                    var pos = $input.position();
                    var height = $input[0].offsetHeight;
 
                    $list.css({
                        top: pos.top + height,
                        left: pos.left,
                        position: 'absolute',
                        display: 'block'
                    });
                } else {
                    $list.css('display', 'none');
                }
            });
        }
    };
}]);
 
mdb.directive('typeaheadItem', function() {
    return {
        require: '^typeahead',
        link: function(scope, element, attrs, controller) {
 
            var item = scope.$eval(attrs.typeaheadItem);
 
            scope.$watch(function() { return controller.isActive(item); }, function(active) {
                if (active) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
 
            element.bind('mouseenter', function(e) {
                scope.$apply(function() { controller.activate(item); });
            });
 
            element.bind('click', function(e) {
                scope.$apply(function() { controller.select(item); });
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