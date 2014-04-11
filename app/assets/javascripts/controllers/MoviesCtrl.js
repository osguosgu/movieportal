MDbControllers.controller('MoviesCtrl', function ($scope) {

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
});