MDbControllers.controller('HubsCtrl', ['$scope', '$routeParams', '$modal', 'Hubs', 'growl', function ($scope, $routeParams, $modal, Hubs, growl) {

    $scope.hubName = "";
    $scope.hubDescr = "";
    $scope.hubPrivacy = "PUBLIC";

    $scope.getHub = function() {
        return _.find($scope.hubs, function(hub) {
            return this == $scope.slug(hub.name);
        }, $routeParams.groupid);
    };

    $scope.deleteHub = function(hub) {
        Hubs.delete({}, {'Id': hub.id}, function(r) {
            console.log(r);
            $scope.$parent.hubs = _.without($scope.$parent.hubs, hub);
            growl.addSuccessMessage("You have deleted the hub " + hub.name);
        });
    };

    $scope.createHub = function() {
        var hub = {
            "name": $scope.hubName,
            "description": $scope.hubDescr
        };
        Hubs.save({}, hub, function(r) {
            console.log(r);
            $scope.$parent.hubs.push(hub);
            growl.addSuccessMessage("Successfully created the new hub " + hub.name);
        });
    };

    $scope.openHubModal = function () {

        var modalInstance = $modal.open({
            templateUrl: '../layouts/create_hub.html',
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

    $scope.hub = $scope.getHub();
}]);