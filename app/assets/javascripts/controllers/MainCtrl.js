MDbControllers.controller('MainCtrl', function($scope, $rootScope, $state, growl, Hubs, Search, Users, Movies, Reviews) {

    $scope.sidebar = false;
    $scope.search = "";

    $rootScope.hubs = Hubs.query();
    $rootScope.myReviews = Reviews.query();

    //$rootScope.popularMovies = Search.popularMovies();
    $rootScope.currentUser = Users.get({Id: "me"});

    $scope.slug = function(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to   = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    };

    $scope.user_tn = function(uid) {
      return "https://graph.facebook.com/" + uid + "/picture";
    }

    $scope.genreFilters = [
        { name: "Action", selected: true },
        { name: "Adventure", selected: true },
        { name: "Animation", selected: true },
        { name: "Comedy", selected: true },
        { name: "Drama", selected: true },
        { name: "Horror", selected: true},
        { name: "Romance", selected: true },
        { name: "Thriller", selected: true }
    ];

    $scope.toggleWatchlist = function(movie) {
        Reviews.metadata({movie_id:  (movie.tmdb_id ||  movie.id), watchlist: !movie.watchlist}, function(response) {
            $scope.popup(movie.title + (!movie.watchlist ? " added to" : " removed from") + " watchlist.");
            //movie.watchlist = !movie.watchlist;
            if (!movie.tmdb_id) {
              response.watchlist = true;
              $rootScope.movies.push(response);
              movie = response;
            }
            else
              movie.watchlist = !movie.watchlist;
        });
    };

    $scope.toggleFav = function(movie) {
        Reviews.metadata({movie_id: (movie.tmdb_id ||  movie.id), favourite: !movie.favourite}, function(response) {
            $scope.popup(movie.title + (!movie.favourite ? " added to" : " removed from") + " favourites.");

            if (!movie.tmdb_id) {
              response.favourite = true;
              $rootScope.movies.push(response);
              movie = response;
            }
            else
              movie.favourite = !movie.favourite;
        });
    };

  $scope.getMovie = function(id) {
    return _.findWhere($rootScope.movies, {id: id});
  };

    $scope.popup = function(msg) {
        growl.addSuccessMessage(msg);
    };

    // placeholder data
    $scope.newsFeed = [
        {
            user: "kapu",
            date: moment().subtract('minutes', 2),
            msg: " accepted your request to join the group 'urpot'"
        },
        {
            user: "Eino",
            date: moment().subtract('hours', 2),
            msg: " reviewed the movie That Awkward Moment."
        },
        {
            user: "leit",
            date: moment().subtract('hours', 7),
            msg: "commented on your review of the movie Lone Survivor"
        }
    ];

    $rootScope.movies = Movies.query();

    //$rootScope.popular = Search.popularMovies();
    $rootScope.upcoming = Search.upcomingMovies();
    /*
        {
            title: "Ride Along",
            date: moment().subtract('minutes', 2),
            img: "http://ia.media-imdb.com/images/M/MV5BNjU4NzYzOTY1MF5BMl5BanBnXkFtZTgwMTAyNTc1MDE@._V1_SX214_.jpg",
            plot: "Fast-talking security guard Ben joins his cop brother-in-law James on a 24-hour patrol of Atlanta in order to prove himself worthy of marrying Angela, James' sister.",
            votes: 6087,
            rating: 6.4,
            year: 2013,
            genres: ["Action"],
            comments:
                [
                    {
                        user: "kapu",
                        date: moment().subtract('minutes', 2),
                        comment: "dsfmlkdsfm smflksefm aölskemfslekmf",
                        rating: 5
                    },
                    {
                        user: "Eino",
                        date: moment().subtract('minutes', 7),
                        comment: "paskaaaa",
                        rating: 5
                    }
                ]

        }
    ]; */

    $scope.selectMovie = function(movie) {
        $scope.movie = movie;
    }
});