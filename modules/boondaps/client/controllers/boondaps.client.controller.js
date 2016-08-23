(function () {
  'use strict';

  // Boondaps controller
  angular
    .module('boondaps')
    .controller('BoondapsController', BoondapsController);

  BoondapsController.$inject = ['$scope', '$state', 'Authentication', 'boondapResolve'];

  function BoondapsController ($scope, $state, Authentication, boondap) {
    var vm = this;

    vm.authentication = Authentication;
    vm.boondap = boondap;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Boondap
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.boondap.$remove($state.go('boondaps.list'));
      }
    }

    // Save Boondap
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.boondapForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.boondap._id) {
        vm.boondap.$update(successCallback, errorCallback);
      } else {
        vm.boondap.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('boondaps.view', {
          boondapId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
