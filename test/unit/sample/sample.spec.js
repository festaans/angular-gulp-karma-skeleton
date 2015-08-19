describe('B-02275 | As a web developer', function() {
  var scope,
    controller;
  beforeEach(function() {
    module('app');
  });
      //
      describe('i want a reference for testing controllers - it', function() {
        beforeEach(inject(function($rootScope, $controller) {
          scope = $rootScope.$new();
          controller = $controller('sampleController', {
            '$scope': scope
          });
        }));

        it('should create $scope.sample when calling createSample()',
          function() {
            expect(scope.sample).toBeUndefined();
            scope.createSample();
            expect(scope.sample).toBeDefined();
            expect(scope.sample).toBe('sample value');
          });

        it('should greet the world', function() {
          scope.greet('World');
          expect(scope.greeting).toBe('Hello World!');
        });
      });
      //
      describe('i want a reference for testing directives - it', function() {
        it('should initate a new sample directive', function() {
          expect('sample string ').toBe('sample directive');
        });
      });
      //
});
