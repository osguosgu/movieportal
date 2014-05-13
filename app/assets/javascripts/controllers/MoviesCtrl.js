MDbControllers.controller('MoviesCtrl', function ($scope, Movies, Search, $http) {

    $scope.displayMode = 0;
    $scope.movieSort = "date";
    $scope.reverse = false;
    $scope.moviesQuery = '';
    $scope.showFilters = false;
    $scope.showYears = false;
    $scope.yearRange = _.range(moment().year(), moment().year() - 50, -1);
    $scope.yearStart = 0;
    $scope.yearEnd = 0;
    $scope.comment = new Array();

    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.sortBy = function(predicate){
        console.log("sort by: " + predicate);
        if ($scope.movieSort == predicate)
            $scope.reverse = !$scope.reverse;
        else
            $scope.movieSort = predicate;
    };

    // return the state of year selection for ng-switch
    $scope.selectedYears = function() {
        if ($scope.yearStart == 0 && $scope.yearEnd == 0)
            return 0;
        if ($scope.yearStart == 0)
            return 1;
        if ($scope.yearEnd == 0)
            return 2;
        if ($scope.yearStart == $scope.yearEnd)
            return 3;
        return 4;
    }

    $scope.selectGenres = function(val) {
        _.each($scope.genreFilters, function(el) {
            el.selected = val;
        });
    };

    $scope.addComment = function(movie,idx) {
        movie.comments.push(
        {
            user: "test",
                date: moment(),
                comment: "asdasd",
            rating: 5
        });
    };

    $scope.genresSelected = function() {
        return _.reduce($scope.genreFilters, function(memo, gn){ return memo + (gn.selected ? 1 : 0); }, 0);
    }

    $scope.remove = function(movie){
        while((i = $scope.movies.indexOf(movie)) !== -1)
            $scope.movies.splice(i, 1);
    };

    $scope.display = function(mode){
        $scope.displayMode = mode;
    };

    $scope.movieFilter = function(movie) {
        // title
        if (movie.title.toLowerCase().indexOf($scope.moviesQuery.toLowerCase()) == -1)
            return false;

        // years
        if (movie.year < $scope.yearStart)
            return false;
        if ($scope.yearEnd > 0 && movie.year > $scope.yearEnd)
            return false;

        // genres
        return _.some(movie.genres, function(gn) {
            return _.findWhere($scope.genreFilters, { selected: true, name: gn}) !== undefined;
        });
    };

    // Adding a new review
    $scope.review = { movie: '', text: '', rating: 0, favourite: false };

    $scope.dismiss = function() {
        //$scope.$dismiss();
        $scope.$close(true);
    };

    $scope.fetch = function() {
        $scope.review.suggestions = Search.movies({query: $scope.review.movie, limit: 5});
    }

    $scope.save = function() {

        console.log($scope.review);
       /*
        Hubs.save({}, $scope.hub, function(createdHub) {
            console.log(createdHub);
            $rootScope.hubs.push(createdHub);
            growl.addSuccessMessage("Successfully created the new hub " + createdHub.name);
            $scope.$close(true);
        }, function (e) {
            growl.addErrorMessage("Unable to create the hub, please check your input!");
        });
        */
    } ;
    $scope.selected = undefined;

    // Any function returning a promise object can be used to load values asynchronously
    $scope.autoComplete = function(val) {
        return $http.get('/search.json', {
            params: {
                query: val,
                type: 'all'
            }
        }).then(function(res){
                var results = [];
                angular.forEach(res.data, function(item){
                    results.push(item);
                    //console.log(item.title);
                });
                console.log(results);
                return results;
            });
    };

});