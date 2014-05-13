// API Services
mdb.factory("Movies", function ($resource) {
    return $resource(
        "/movies/:Id",
        {Id: "@Id" },
        {
            "update": {method: "PUT"},
            //"reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}

        }
    );
});

mdb.factory("Search", function ($resource) {
    return $resource(
        "/search.json",
        {},
        {
            "movies": {'method': 'GET', 'params': {'type': "movies"}, isArray: true},
            "popularMovies": {'method': 'GET', 'params': {'type': "popular"}, isArray: true},
            "users": {'method': 'GET', 'params': {'type': "users"}, isArray: true},
            "hubs": {'method': 'GET', 'params': {'type': "hubs"}, isArray: true},
            "all": {'method': 'GET', 'params': {'type': "all"}, isArray: true}
        }
    );
});

mdb.factory("Hubs", function ($resource) {
    return $resource(
        "/hubs/:Id.json",
        {Id: "@Id" },
        {
            "update": {method: "PUT"},
            //"reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}

        }
    );
});

mdb.service('sessionService', [
    '$window', function($window) {
        var factory;
        factory = {
            current_user: function() {
                return $window.gon.current_user;
            }
        };
        return factory;
    }
]);
