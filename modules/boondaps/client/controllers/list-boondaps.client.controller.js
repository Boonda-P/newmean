(function () {
  'use strict';

  angular
    .module('boondaps')
    .controller('BoondapsListController', BoondapsListController);

  BoondapsListController.$inject = ['BoondapsService'];

  function BoondapsListController(BoondapsService) {
    var vm = this;

    vm.boondaps = BoondapsService.query();
  }
})();
