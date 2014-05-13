MDbControllers.controller('UsersCtrl', ['$scope', '$rootScope', '$stateParams', '$modal', 'Users', 'growl', function ($scope, $rootScope, $stateParams, $modal, Users, growl) {

    if (isNaN($stateParams.id))
        $scope.user = $rootScope.currentUser;
    else
        $scope.user = Users.get({'Id': $stateParams.id});

}]);