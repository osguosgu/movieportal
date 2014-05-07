MDbControllers.controller('HubsCtrl', ['$scope', '$routeParams', '$modal', 'Hubs', 'growl', function ($scope, $routeParams, $modal, Hubs, growl) {

    $scope.hubName = "";
    $scope.hubDescr = "";
    $scope.hubPrivacy = "PUBLIC";

    $scope.getGroup = function() {
        return _.find($scope.groups, function(group) {
            return this == $scope.slug(group.name);
        }, $routeParams.groupid);
    };

    $scope.leaveGroup = function(grp) {
        Hubs.delete({}, {'Id': grp.id}, function(r) {
            console.log(r);
            $scope.$parent.groups = _.without($scope.$parent.groups, grp);
            growl.addSuccessMessage("You have left the group " + grp.name);
        });
    };

    $scope.createGroup = function() {
        var grp = {
            "name": $scope.hubName,
            "description": $scope.hubDescr
        };
        Hubs.save({}, grp, function(r) {
            console.log(r);
            $scope.$parent.groups.push(grp);
            growl.addSuccessMessage("Successfully created the new group " + grp.name);
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