MDbControllers.controller('HubsCtrl', ['$scope', '$routeParams', '$modal', 'Hubs', 'growl', function ($scope, $routeParams, $modal, Hubs, growl) {

    $scope.getGroup = function() {
        return _.find($scope.groups, function(group) {
            return this == $scope.slug(group.name);
        }, $routeParams.groupid);
    };

    $scope.leaveGroup = function(grp) {
        Hubs.delete({}, {'Id': grp.id}, function(r) {
            console.log(r);
            $scope.groups = _.without($scope.groups, grp);
            growl.addSuccessMessage("You have left the group " + grp.name);
        });
    };

    $scope.openHubModal = function () {

        var modalInstance = $modal.open({
            templateUrl: '../layouts/create_group.html',
            controller: function ($scope, $modalInstance) {

                $scope.ok = function () {
                    $modalInstance.close($scope.selected.item);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });

    };

    $scope.group = $scope.getGroup();
}]);