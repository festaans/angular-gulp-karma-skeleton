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
