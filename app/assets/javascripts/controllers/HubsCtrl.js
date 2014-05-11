MDbControllers.controller('HubsCtrl', ['$scope', '$routeParams', '$modal', 'Hubs', 'growl', function ($scope, $routeParams, $modal, Hubs, growl) {

    $scope.hubName = "";
    $scope.hubDescr = "";
    $scope.hubPrivacy = 0;

    $scope.findHub = function() {
        return _.find($scope.hubs, function(hub) {
            return this == $scope.slug(hub.name);
        }, $routeParams.slug);
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
            "description": $scope.hubDescr,
            "privacy": $scope.hubPrivacy
        };
        Hubs.save({}, hub, function(createdHub) {
            console.log(createdHub);
            $scope.$parent.hubs.push(createdHub);
            growl.addSuccessMessage("Successfully created the new hub " + createdHub.name);
        }, function (e) {
            growl.addErrorMessage("Unable to create the hub, please check your input!");
        });
        $scope.hubName = $scope.hubDescr = "";
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

    $scope.showPrivacy = function(privacy) {
        switch (privacy) {
            case 2:
                return "Invite only";
            case 1:
                return "Closed";
            default:
                return "Open";

        }
    }

    $scope.hub = Hubs.get({'Id': $routeParams.id});
}]);