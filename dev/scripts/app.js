var app = angular.module('app', [
  'ui.router'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider

.state('sample', {
  url: "/sample",
  views: {
    "sample": {
      templateUrl: "components/views/sample/sample.template.html",
      controller: "sampleController"
    }
  }
})  //do not add a ;

;
}]);

app.controller('sampleController',['$scope', function($scope) {
  var date = new Date();
  $scope.time = date;

  $scope.createSample = function() {
    $scope.sample = "sample value";
  };
  
  $scope.greet = function(who) {
    $scope.greeting = "Hello " + who + "!"
  };
}]);
