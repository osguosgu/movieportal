MDbControllers.controller('HubsCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {

    $scope.getGroup = function() {
        return _.find($scope.groups, function(group) {
            return this == $scope.slug(group.name);
        }, $routeParams.groupid);
    };

    $scope.group = $scope.getGroup();
}]);
