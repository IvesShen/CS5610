(function(){
    angular
        .module("ProjectWebMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
        /*            .when('/', {
         templateUrl : "/views/user/login.view.client.html",
         controller: "LoginController",
         controllerAs: "model"
         })*/
            .when('/home', {
                templateUrl : "views/home/home.html",
                // resolve: {
                //     currentUser: checkLoggedIn
                // }
            })
            .when('/login', {
                templateUrl : "views/user/login.view.client.html",
                // controller: "LoginController",
                // controllerAs: "model"
            })
            // #!/user/{{model.uid}}
            .otherwise({
                redirectTo : "/home"
            });
    }

    function checkLoggedIn($q, $location, UserService) {
        var deferred = $q.defer();
        UserService
            .checkLoggedIn()
            .then(function (currentUser) {
               if(currentUser === '0'){
                   deferred.reject();
                   $location.url('/login');
               } else {
                   deferred.resolve(currentUser);
               }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, UserService) {
        var deferred = $q.defer();
        UserService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0'){
                    deferred.resolve({});
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();