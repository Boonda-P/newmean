(function() {
  'use strict';

  angular
    .module('core')
    .controller('BoondaRouteController', BoondaRouteController);

  BoondaRouteController.$inject = ['$scope'];

  function BoondaRouteController($scope) {
    var vm = this;

    // Boonda route controller logic
    // ...
    $scope.double = function(value) { return value * 2; };

    init();

    function init() {
    }
  }
})();
