(function () {
  'use strict';

  angular
    .module('core')
    .factory('coreService', coreService);

  coreService.$inject = [/*Example: '$state', '$window' */];

  function coreService(/*Example: $state, $window */) {
    // Boondaservice service logic
    // ...

    // Public API
    return {
      someMethod: function () {
        return true;
      }
    };
  }
})();
