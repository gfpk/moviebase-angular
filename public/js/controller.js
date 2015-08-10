var moviesApp = angular.module('moviesApp', ['ngAnimate','ngRoute']);

moviesApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/movies/:movieId', {
			templateUrl: 'partials/detailed.html',
			controller: 'moviesCtrl'
		}).
			when('/category/:category', {
			templateUrl: 'partials/list.html',
			controller: 'moviesCtrl'
		}).
			when('/404', {
			templateUrl: 'partials/404.html',
			controller: 'moviesCtrl'
		}).otherwise({			
			templateUrl: 'partials/list.html',
			controller: 'moviesCtrl'
	});
		
}]);

moviesApp.controller('moviesCtrl', function ($scope, $animate, $http, $routeParams, $location) {
    $http.get('../data/movies.json').success(function(data) {
        $scope.movies = data;
        $scope.genrefilter =($routeParams.category) ? $routeParams.category : '';
        $scope.singleMovie= $scope.movies[($routeParams.movieId)];
        $scope.range = function(num){
        	var arr = [];
        	for (var i = 0; i < num; i++) {
        		arr.push(i)
        	};
        	return arr
		};	

       	if($routeParams.movieId){
       		if(!$scope.movies[($routeParams.movieId)]){
       			$location.path('/404')
       		}
       	}
    });
});

