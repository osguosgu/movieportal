MDbControllers.controller('HubsCtrl', function ($scope, $rootScope, $stateParams, $modal, Hubs, Reviews, growl) {

    $scope.reviewPredicate = "create_at";
    $scope.reviewDesc = true;

    $scope.findHub = function() {
        return _.find($rootScope.hubs, function(hub) {
            return this == $scope.slug(hub.name);
        }, $stateParams.slug);
    };

    $scope.deleteHub = function(hub) {
        Hubs.delete({}, {'Id': hub.id}, function(r) {
            console.log(r);
            $rootScope.hubs = _.without($rootScope.hubs, hub);
            growl.addSuccessMessage("You have deleted the hub " + hub.name);
        });
    };

    $scope.addComment = function(review) {
      Reviews.comment({Id: review.id}, {text: review.comment}, function(response) {
         console.log(response);
        review.comments.push(response);
        //growl.addSuccessMessage("You have deleted the hub ");
      });
      review.comment = "";
      //growl.addSuccessMessage("You have deleted the hub ");
    };

    $scope.createHub = function() {
        var hub = {
            "name": $scope.hubName,
            "description": $scope.hubDescr,
            "privacy": $scope.hubPrivacy
        };
        Hubs.save({}, hub, function(createdHub) {
            console.log(createdHub);
            $rootScope.hubs.push(createdHub);
            growl.addSuccessMessage("Successfully created the new hub " + createdHub.name);
        }, function (e) {
            growl.addErrorMessage("Unable to create the hub, please check your input!");
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

    $scope.getUser = function(id) {
      return _.findWhere($scope.hub.users, {id: id});
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

    $scope.hub = { name: '', description: '', privacy: 0 };

    if (!isNaN($stateParams.id))
        $scope.hub = Hubs.get({'Id': $stateParams.id});


    $scope.dismiss = function() {
        //$scope.$dismiss();
        $scope.$close(true);
    };

        //$scope.test = function() { return $scope.hubName + " - " + $scope.hubDescr }

    $scope.save = function() {

        //console.log("save: " + $scope.hubName);

        Hubs.save({}, $scope.hub, function(createdHub) {
            console.log(createdHub);
            $rootScope.hubs.push(createdHub);
            growl.addSuccessMessage("Successfully created the new hub " + createdHub.name);
            $scope.$close(true);
        }, function (e) {
            growl.addErrorMessage("Unable to create the hub, please check your input!");
        });
    }
});