MDbControllers.controller('MainCtrl', ['$scope', '$rootScope', '$state', 'growl', 'Hubs', function($scope, $rootScope, $state, growl, Hubs) {
    $scope.sidebar = false;
    $scope.search = "";

    $rootScope.hubs = Hubs.query();

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
        movie.watchlist = !movie.watchlist;
        $scope.popup(movie.title + (movie.watchlist ? " added to" : " removed from") + " watchlist.");
    };

    $scope.popup = function(msg) {
        growl.addSuccessMessage(msg);
    };

    // placeholder data
    $scope.newsFeed = [
        {
            user: "kapu",
            date: moment().subtract('minutes', 2),
            msg: " accepted your request to join the group 'urpot'",
        },
        {
            user: "Eino",
            date: moment().subtract('hours', 2),
            msg: " reviewed the movie That Awkward Moment.",
        },
        {
            user: "leit",
            date: moment().subtract('hours', 7),
            msg: "commented on your review of the movie Lone Survivor",
        }
    ];

    $scope.movies = [
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

        },
        {
            title: "Lone Survivor",
            date: moment().subtract('hours', 2),
            year: 2013,
            img: "http://ia.media-imdb.com/images/M/MV5BMjA0NTgwOTk5Ml5BMl5BanBnXkFtZTcwMjE3NDc5OQ@@._V1_SX214_.jpg",
            rating: 7.9,
            votes: 46225,
            watchlist: true,
            genres: ["Action", "Biography", "Drama"],
            director: "Peter Berg",
            plot: "Three best friends find themselves where we've all been - at that confusing moment in every dating relationship when you have to decide \"So...where is this going?\"",
            comments: []
        },
        {
            title: "The Nut Job",
            year: 2013,
            img: "http://ia.media-imdb.com/images/M/MV5BMTQ1NjAxMDUzN15BMl5BanBnXkFtZTgwOTE5NDM3MDE@._V1_SY317_CR0,0,214,317_.jpg",
            rating: 5.7,
            votes: 1669,
            genres: ["Animation", "Adventure", "Comedy"],
            date: moment().subtract('hours', 7),
            director: "Peter Lepeniotis",
            watchlist: true,
            plot: "Three best friends find themselves where we've all been - at that confusing moment in every dating relationship when you have to decide \"So...where is this going?\"",
            comments: [
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
                },
                {
                    user: "leit",
                    date: moment().subtract('minutes', 7),
                    comment: "Loistava alku; johtoon 0-1; sitten jäähysuma 9x2 meille 2x2 Kookoolle (Pöyhönen-Vanninen ?????",
                    rating: 5
                },
                {
                    user: "wooble",
                    date: moment().subtract('minutes', 7),
                    comment: "Simply gre...at!!Aurinkoa?, golfia, hyviä kirjoja, relax - wau mikä breikki- tulee vielä loistavaan väliin- sen jälkeen alkaa valmistautuminen \"maikkarin\" kiekkokevääseen \"Veli Antsan ja Teemu Niikon & knien kanssa!! Kun työ on tehty hyvin , voi hyvillä mielin saunoa ja ottaa pari Kukkoa!",
                    rating: 5
                },
                {
                    user: "rihanna",
                    date: moment().subtract('minutes', 7),
                    comment: "Hieno aamu, Lumia pirahti jo 06.00, time to wake up TIGER!!! Treeneihin (Marli Areena) vapaa pääsy!! Pysy kanavallaa siellä lisää!!",
                    rating: 5
                },
            ]
        },
        {
            title: "That Awkward Moment",
            img: "http://ia.media-imdb.com/images/M/MV5BMjExODEyMjMwNV5BMl5BanBnXkFtZTgwMTAyODM1MDE@._V1_SX214_.jpg",
            date: moment().subtract('days', 1),
            rating: 6,
            votes: 2098,
            year: 2014,
            genres:  ["Animation", "Adventure", "Comedy"],
            plot: "Three best friends find themselves where we've all been - at that confusing moment in every dating relationship when you have to decide \"So...where is this going?\"",
            comments: []
        }
    ];

    $scope.movier = function() {
        return _.sample($scope.movies);
    };
    $scope.movie = $scope.movier();

    $scope.selectMovie = function(movie) {
        $scope.movie = movie;
    }

    // Instantiate the bloodhound suggestion engine
    var numbers = new Bloodhound({
        datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local:
            [
                { num: 'one' },
                { num: 'two' },
                { num: 'three' },
                { num: 'four' },
                { num: 'five' },
                { num: 'six' },
                { num: 'seven' },
                { num: 'eight' },
                { num: 'nine' },
                { num: 'ten' }
            ]
    });

    // initialize the bloodhound suggestion engine
    numbers.initialize();

    // Allows the addition of local datum
    // values to a pre-existing bloodhound engine.
    $scope.addValue = function () {
        numbers.add({
            num: 'twenty'
        });
    };

    // Typeahead options object
    $scope.exampleOptions = {
        highlight: true
    };

    // Single dataset example
    $scope.exampleData = {
        displayKey: 'num',
        source: numbers.ttAdapter()
    };
    /*
     // Multiple dataset example
     $scope.multiExample = [
     {
     name: 'nba',
     displayKey: 'team',
     source: nba.ttAdapter()   // Note the nba Bloodhound engine isn't really defined here.
     },
     {
     name: 'nhl',
     displayKey: 'team',
     source: nhl.ttAdapter()   // Note the nhl Bloodhound engine isn't really defined here.
     }
     ];

     */
}]);